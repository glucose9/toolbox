# GitHub 오픈소스 계획 — 개발자 링크 확보용

> 목표: 개발자들이 실제로 쓰고 README에서 barokit.com으로 이어지는 작은 라이브러리 1개. 저장소 생성·npm 배포는 회원님 계정으로 진행합니다.

## 무엇을 공개하나: `hwp-to-pdf-browser`

브라우저에서 HWP/HWPX → PDF를 만드는 얇은 라이브러리. 이 저장소에서 검증된 두 조각을 그대로 옮깁니다.

| 옮길 파일 | 역할 |
|---|---|
| `lib/hwp-pdf.ts` | rhwp 페이지 SVG → `<img>` → canvas → JPEG → pdf-lib. 페이지 크기 px→pt 변환, 20p+ 문서 1.5x 자동 |
| `lib/hwp-pdf.ts`의 `embeddedFontCssFor` | Google Fonts CSS를 파싱해 문서가 쓰는 unicode-range 서브셋만 data: URI로 인라인 — `<img>` 로드 SVG에서 웹폰트가 안 먹는 문제의 해법 |
| `lib/kr-fonts.ts`의 `withKrFontFallbacks` / `krFallbackChain` | 문서 글꼴명 → 폴백 체인. 측정과 표시가 같은 체인을 쓰도록 강제 |
| `lib/hwp.ts`의 `openHwp` (measureTextWidth 훅 포함) | rhwp 로딩 + 줄바꿈 측정 훅 |

의존성: `@rhwp/core`, `pdf-lib`. 라이선스 MIT. 패키지 크기 작음(폰트는 런타임에 받음).

## API 초안

```ts
import { hwpToPdf } from "hwp-to-pdf-browser";

const bytes = await hwpToPdf(file, {
  scale: 2,                 // 기본 2, 20페이지 초과 시 1.5
  quality: 0.8,
  embedWebFonts: true,      // Noto KR 서브셋 인라인 (기본 true)
  onProgress: (done, total) => {},
});
// → Uint8Array (PDF)
```

## README 핵심 문단 (한/영)

**KO**
> 브라우저에서 HWP를 PDF로. 파일이 서버로 가지 않습니다. rhwp(wasm)로 페이지를 SVG로 렌더링하고, 문서가 실제로 쓰는 Noto KR 글꼴 서브셋만 SVG에 임베드해 래스터화한 뒤 pdf-lib로 묶습니다. 결과는 화면 미리보기와 동일합니다. 라이브 데모: https://barokit.com/tools/hwp-to-pdf

**EN**
> Convert HWP (Korean Hancom documents) to PDF entirely in the browser — nothing is uploaded. Pages are rendered to SVG by rhwp (wasm); only the Noto KR unicode-range subsets the document actually uses are inlined as data: URIs so an `<img>`-loaded SVG rasterizes with the same web fonts as the on-screen preview; pdf-lib assembles the result. Live demo: https://barokit.com/tools/hwp-to-pdf

## 왜 이게 링크가 되나
- "hwp pdf javascript", "hwp to pdf browser"로 찾는 개발자가 있고, 지금 그 자리에 브라우저 전용 해법이 없습니다.
- README의 데모 링크 + 패키지 홈페이지 필드(`homepage: https://barokit.com`)가 자연스러운 외부 링크가 됩니다.
- GeekNews 글(docs/outreach/geeknews-post.md)의 기술 내용과 같은 이야기라 함께 올리면 서로 트래픽을 줍니다.

## 순서
1. 회원님이 GitHub에 `hwp-to-pdf-browser` 저장소 생성(MIT) → 알려주시면 제가 코드 추출·README·package.json·예제 페이지까지 커밋 가능한 상태로 준비합니다.
2. npm 배포는 회원님 계정으로(`npm publish`).
3. 배포 후 GeekNews 글 게시 시 저장소 링크를 함께.

## 두 번째 후보 (여력이 있으면)
`ffmpeg-wasm-webpack-recipe`: `scripts/bundle-ffmpeg-worker.mjs` + `lib/ffmpeg.ts`(CDN 폴백 포함)를 예제 Next.js 프로젝트로. ffmpeg.wasm 0.12 + webpack 조합에서 고생하는 사람이 많아 검색 수요가 있습니다.
