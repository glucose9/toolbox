"use client";

const METHODS = [
  { name: "GET", idempotent: true, safe: true, desc: "리소스를 가져옴. 본문 없이 요청.", use: "검색, 페이지 로딩" },
  { name: "POST", idempotent: false, safe: false, desc: "리소스 새로 만들기 또는 임의 처리.", use: "회원가입, 결제, 파일 업로드" },
  { name: "PUT", idempotent: true, safe: false, desc: "리소스 전체 교체 또는 새로 생성.", use: "리소스 업데이트 (전체)" },
  { name: "PATCH", idempotent: false, safe: false, desc: "리소스 일부 수정.", use: "프로필 일부 수정" },
  { name: "DELETE", idempotent: true, safe: false, desc: "리소스 삭제.", use: "글/계정 삭제" },
  { name: "HEAD", idempotent: true, safe: true, desc: "GET과 같지만 본문 없이 헤더만.", use: "리소스 존재 확인" },
  { name: "OPTIONS", idempotent: true, safe: true, desc: "허용된 메소드 목록 조회.", use: "CORS preflight" },
  { name: "CONNECT", idempotent: false, safe: false, desc: "프록시 터널 생성.", use: "HTTPS 프록시" },
  { name: "TRACE", idempotent: true, safe: true, desc: "요청 echo (디버깅).", use: "디버깅. 보안상 차단 권장." },
];

export default function HttpMethodsTool() {
  return (
    <div className="card space-y-3">
      <div className="grid grid-cols-1 gap-2">
        {METHODS.map((m) => (
          <div key={m.name} className="border border-gray-200 dark:border-gray-700 rounded p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-lg">{m.name}</span>
              {m.safe && <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">safe</span>}
              {m.idempotent && <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">idempotent</span>}
            </div>
            <div className="text-sm mt-1">{m.desc}</div>
            <div className="text-xs text-muted mt-1">예: {m.use}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted">safe: 서버 상태 변경 없음 · idempotent: 여러 번 실행해도 같은 결과</div>
    </div>
  );
}
