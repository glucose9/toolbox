"use client";

import { useMemo, useState } from "react";

type Status = { code: number; name: string; desc: string };

const STATUSES: Status[] = [
  // 1xx
  { code: 100, name: "Continue", desc: "요청이 받아들여졌으며 클라이언트가 계속 진행 가능." },
  { code: 101, name: "Switching Protocols", desc: "프로토콜 전환 (예: HTTP → WebSocket)." },
  { code: 102, name: "Processing", desc: "처리 중 (WebDAV)." },
  { code: 103, name: "Early Hints", desc: "최종 응답 전 힌트 제공 (Link 헤더 등)." },
  // 2xx
  { code: 200, name: "OK", desc: "요청 성공. GET/POST 기본 성공." },
  { code: 201, name: "Created", desc: "리소스가 새로 만들어짐 (POST/PUT 결과)." },
  { code: 202, name: "Accepted", desc: "받았지만 처리는 비동기/지연됨." },
  { code: 204, name: "No Content", desc: "성공했지만 본문 없음. DELETE 응답에 자주." },
  { code: 206, name: "Partial Content", desc: "범위(Range) 요청에 대한 부분 응답." },
  // 3xx
  { code: 301, name: "Moved Permanently", desc: "영구 이동. 새 URL로 리다이렉트 권장." },
  { code: 302, name: "Found", desc: "임시 이동. 원본 URL은 유지." },
  { code: 303, name: "See Other", desc: "POST 후 GET으로 리다이렉트 (Post/Redirect/Get)." },
  { code: 304, name: "Not Modified", desc: "캐시가 유효함. 본문 없이 캐시 사용." },
  { code: 307, name: "Temporary Redirect", desc: "임시 리다이렉트 (메소드 보존)." },
  { code: 308, name: "Permanent Redirect", desc: "영구 리다이렉트 (메소드 보존)." },
  // 4xx
  { code: 400, name: "Bad Request", desc: "요청 형식이 잘못됨." },
  { code: 401, name: "Unauthorized", desc: "인증 필요. Authorization 헤더 누락/잘못됨." },
  { code: 402, name: "Payment Required", desc: "결제 필요 (거의 사용 안 됨, 일부 API에서 사용)." },
  { code: 403, name: "Forbidden", desc: "권한 없음. 인증은 됐지만 접근 거부." },
  { code: 404, name: "Not Found", desc: "리소스 없음." },
  { code: 405, name: "Method Not Allowed", desc: "허용되지 않은 HTTP 메소드 (예: GET 전용 URL에 POST)." },
  { code: 406, name: "Not Acceptable", desc: "Accept 헤더가 요구하는 형식 제공 불가." },
  { code: 408, name: "Request Timeout", desc: "요청 시간 초과." },
  { code: 409, name: "Conflict", desc: "현재 상태와 충돌 (동시 수정 등)." },
  { code: 410, name: "Gone", desc: "영구 삭제됨." },
  { code: 411, name: "Length Required", desc: "Content-Length 헤더 필요." },
  { code: 412, name: "Precondition Failed", desc: "조건부 헤더(If-Match 등) 불일치." },
  { code: 413, name: "Payload Too Large", desc: "요청 본문이 너무 큼." },
  { code: 414, name: "URI Too Long", desc: "URL이 너무 김." },
  { code: 415, name: "Unsupported Media Type", desc: "지원하지 않는 Content-Type." },
  { code: 418, name: "I'm a teapot", desc: "농담용 코드 (RFC 2324). 일부 사이트가 봇 차단에 사용." },
  { code: 422, name: "Unprocessable Entity", desc: "형식은 맞지만 내용에 오류 (검증 실패)." },
  { code: 425, name: "Too Early", desc: "재전송 공격 위험으로 처리 거부." },
  { code: 426, name: "Upgrade Required", desc: "프로토콜 업그레이드 필요 (예: HTTP/2)." },
  { code: 428, name: "Precondition Required", desc: "조건부 요청 필요 (충돌 방지)." },
  { code: 429, name: "Too Many Requests", desc: "Rate limit 초과. Retry-After 헤더 확인." },
  { code: 431, name: "Request Header Fields Too Large", desc: "헤더가 너무 큼." },
  { code: 451, name: "Unavailable For Legal Reasons", desc: "법적 이유로 차단 (검열 등)." },
  // 5xx
  { code: 500, name: "Internal Server Error", desc: "서버 내부 오류 (구체적 이유 없음)." },
  { code: 501, name: "Not Implemented", desc: "서버가 메소드/기능을 구현하지 않음." },
  { code: 502, name: "Bad Gateway", desc: "게이트웨이/프록시가 잘못된 응답 받음." },
  { code: 503, name: "Service Unavailable", desc: "일시 사용 불가 (유지보수·과부하)." },
  { code: 504, name: "Gateway Timeout", desc: "게이트웨이 시간 초과." },
  { code: 505, name: "HTTP Version Not Supported", desc: "HTTP 버전 미지원." },
  { code: 507, name: "Insufficient Storage", desc: "저장 공간 부족 (WebDAV)." },
  { code: 511, name: "Network Authentication Required", desc: "네트워크 인증 필요 (캡티브 포털 등)." },
];

function categoryOf(code: number): string {
  if (code < 200) return "정보";
  if (code < 300) return "성공";
  if (code < 400) return "리다이렉션";
  if (code < 500) return "클라이언트 오류";
  return "서버 오류";
}

function colorOf(code: number): string {
  if (code < 200) return "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700";
  if (code < 300) return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700";
  if (code < 400) return "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700";
  if (code < 500) return "bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700";
  return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700";
}

export default function HttpStatusTool() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return STATUSES;
    return STATUSES.filter(
      (s) =>
        s.code.toString().includes(query) ||
        s.name.toLowerCase().includes(query) ||
        s.desc.toLowerCase().includes(query) ||
        categoryOf(s.code).includes(query)
    );
  }, [q]);

  return (
    <div className="card space-y-3">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="코드(404), 이름(Not Found), 또는 키워드로 검색"
        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
      />
      <div className="text-xs text-muted">{filtered.length}개 결과</div>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {filtered.map((s) => (
          <div key={s.code} className={`border rounded p-3 ${colorOf(s.code)}`}>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">{s.code}</span>
              <span className="font-semibold">{s.name}</span>
              <span className="text-xs text-muted ml-auto">{categoryOf(s.code)}</span>
            </div>
            <div className="text-sm mt-1">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
