# GeekNews 게시용 초안

> 게시 위치: https://news.hada.io/new — "Show GN" 성격의 글. 제목 + 본문(마크다운). 링크는 본문 첫 줄에 한 번, 마지막에 한 번.

## 제목 (택 1)

- 서버 없이 브라우저에서만 도는 HWP 변환기를 만들며 배운 것들 (rhwp wasm, 폰트, ffmpeg.wasm 함정)
- HWP를 서버에 올리지 않고 PDF로 바꾸기 — 브라우저 전용 문서 도구 만들기

## 본문

바로킷(https://barokit.com)은 HWP·PDF·이미지·영상 파일을 **브라우저 안에서만** 처리하는 도구 모음입니다. 파일이 서버로 올라가지 않는다는 게 전부이고, 그걸 지키느라 겪은 기술적 문제 몇 개를 공유합니다.

### 1. HWP를 브라우저에서 여는 것 자체

한컴 전용 바이너리(.hwp)를 파싱해 렌더링하는 Rust 라이브러리 **rhwp**를 wasm으로 올려 씁니다. 페이지를 SVG로 뽑아주는데, 여기서 첫 번째 함정이 있었습니다. rhwp는 줄바꿈 위치를 계산할 때 호스트가 제공하는 `measureTextWidth(font, text)` 훅으로 글자 폭을 잽니다. 이 훅이 재는 폰트와 화면에 그리는 폰트가 다르면 **줄바꿈 위치가 통째로 밀립니다.** 해결은 단순하지만 놓치기 쉬웠습니다 — 측정용 canvas 컨텍스트와 표시용 SVG가 정확히 같은 font-family 폴백 체인(`"함초롬바탕", "Noto Serif KR", serif`)을 쓰도록 강제하는 것.

### 2. "PDF로 저장"이 사실은 인쇄 다이얼로그였던 문제

처음 버전은 페이지 SVG를 팝업에 넣고 `window.print()`를 불렀습니다. 동작은 하지만 (1) 도구가 파일을 만들지 않으니 일괄 변환이 불가능하고 (2) iOS에서 저장이 거의 안 됩니다. 실제 검색 로그에 "hwp to pdf 일괄 변환"이 뜨는 걸 보고 진짜 PDF를 만들기로 했습니다.

방식은 페이지 SVG → `<img>` → canvas → JPEG → pdf-lib. 여기서 두 번째 함정: **`<img>`로 로드한 SVG는 외부 리소스를 전혀 못 가져옵니다.** 페이지에 로드된 웹폰트도 못 씁니다. 그래서 화면 미리보기와 PDF의 글꼴이 달라집니다.

해결: Google Fonts CSS를 파싱해 `@font-face` 블록을 data: URI로 인라인해서 SVG 안에 `<style>`로 넣습니다. 단, Noto Sans KR은 unicode-range로 ~100개 서브셋으로 쪼개져 있어서 전부 넣으면 10MB가 넘습니다. **문서에 실제로 등장하는 코드포인트와 겹치는 서브셋만** 골라 넣으니 문서당 1MB 안팎으로 끝났고, 결과 PDF가 미리보기와 픽셀 단위로 같아졌습니다.

### 3. ffmpeg.wasm 0.12를 webpack에서 돌리기

영상 도구는 ffmpeg.wasm을 쓰는데, 프로덕션 번들에서만 죽는 문제가 세 겹이었습니다.

- `classWorkerURL`을 안 주면 워커가 아예 안 뜹니다.
- UMD 워커를 module worker로 띄우면 `import()`가 "Cannot find module"로 죽고, ESM 워커는 상대 import 때문에 blob URL로는 못 씁니다.
- 결국 ESM 워커의 `const/errors/worker.js`를 한 파일로 이어 붙인 자체 번들을 `toBlobURL`로 올리고, 코어는 ESM 빌드(default export 있는 쪽)를 쓰는 조합만 살아남았습니다.

덤으로, 코어를 unpkg 한 곳에서만 받다가 스트림이 중간에 끊기면 `@ffmpeg/util`이 이미 읽은 body를 다시 읽으려다 "Response body stream already read"라는 엉뚱한 에러를 냅니다. CDN 두 곳(unpkg → jsDelivr) 폴백을 넣었습니다. 32MB wasm을 자체 호스팅하지 않은 이유는 Vercel 전송량 과금 때문입니다.

### 4. 검증은 실제 파일로만

정적 코드 리뷰로 "깨끗하다"고 판단했던 변환기 15개가 실제로는 동작하지 않았던 적이 있습니다(위 webpack 문제). 그 뒤로는 Playwright로 프로덕션에 실제 파일을 올리고, 내려받은 결과물의 매직바이트·페이지 수·ZIP 엔트리까지 검사하는 하니스를 돌립니다. HWP는 공고문·서식·99페이지 요강 같은 실제 문서 5종으로 매번 확인합니다.

### 왜 서버를 안 쓰나

HWP로 오가는 문서는 공문서, 계약서, 이력서, 명세서입니다. "업로드하면 24시간 뒤 삭제합니다"보다 "애초에 안 올라갑니다"가 설명이 짧습니다. 대가는 위의 모든 문제를 클라이언트에서 풀어야 한다는 것이고, 그게 이 글의 내용입니다.

2번의 HWP→PDF 부분(rhwp 로딩·폰트 측정 훅·서브셋 폰트 임베딩·pdf-lib 조립)은 라이브러리로 떼어 MIT로 공개했습니다: https://github.com/glucose9/hwp-to-pdf-browser

도구: https://barokit.com (HWP 뷰어/PDF/텍스트/HWPX, PDF 합치기·분할·압축, HEIC, 영상 압축 등)

---

*게시 팁: 댓글에서 "rhwp가 뭐냐"는 질문이 나올 가능성이 큽니다. rhwp GitHub 링크를 답글로 달아 두면 대화가 이어집니다. 사이트 홍보 톤보다 "이런 문제를 이렇게 풀었다"에 무게를 두는 편이 GN에서 반응이 좋습니다.*
