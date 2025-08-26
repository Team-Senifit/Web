// scripts/dev-proxy.mjs
import "dotenv/config"; // .env 로드
import fs from "node:fs";
import https from "node:https";
import httpProxy from "http-proxy";
import { URL } from "node:url";

// ── 설정 ───────────────────────────────────────────────────────────────────────
const HTTPS_PORT = 3000; // 사용자가 접속할 포트 (HTTPS)
const NEXT_URL = process.env.NEXT_URL || "http://127.0.0.1:3001"; // Next dev
const API_PREFIX = process.env.API_PREFIX || "/api"; // 프론트 라우팅 프리픽스

// .env 예: NEXT_PUBLIC_API_URL=https://dev.api.example.com/api
const apiBase = process.env.NEXT_PUBLIC_API_URL?.trim();
if (!apiBase) {
  console.error("❌ NEXT_PUBLIC_API_URL 이(가) .env에 설정되어 있지 않습니다.");
  process.exit(1);
}
let API_BASE_URL;
try {
  API_BASE_URL = new URL(apiBase);
} catch {
  console.error(
    `❌ NEXT_PUBLIC_API_URL 값이 올바른 URL이 아닙니다: ${apiBase}`
  );
  process.exit(1);
}

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  secure: false, // 개발용: self-signed 허용
  ws: true,
  xfwd: true,
});

// 쿠키 도메인/보안 리라이트(개발 편의)
proxy.on("proxyRes", (proxyRes, req, res) => {
  const setCookie = proxyRes.headers["set-cookie"];
  if (setCookie) {
    const rewritten = setCookie.map((c) =>
      // Domain=... 이 있으면 localhost로 강제 (없으면 그대로 둠)
      c
        .replace(/;\s*Domain=[^;]+/i, "; Domain=localhost")
        // 개발환경이라 Secure 없으면 추가(HTTPS 브라우저 컨텍스트에서 필요)
        .replace(/(;?\s*)$/i, "; Secure$1")
    );
    res.setHeader("set-cookie", rewritten);
  }
});

// 경로 조인 유틸
function joinPath(a, b) {
  const p1 = a.endsWith("/") ? a.slice(0, -1) : a;
  const p2 = b.startsWith("/") ? b.slice(1) : b;
  return p2 ? `${p1}/${p2}` : p1 || "/";
}

// 라우팅 타겟 결정 및 경로 리라이트
function routeAndRewrite(req) {
  const reqUrl = new URL(req.url, `https://localhost:${HTTPS_PORT}`);
  const isApi = reqUrl.pathname.startsWith(API_PREFIX);

  if (isApi) {
    // /api/* → BACKEND (NEXT_PUBLIC_API_URL)
    // 1) /api 프리픽스 제거
    const strippedPath = reqUrl.pathname.slice(API_PREFIX.length) || "/";
    // 2) 백엔드 base path(API_BASE_URL.pathname)와 합치기
    const targetPath = joinPath(API_BASE_URL.pathname || "/", strippedPath);
    // 3) req.url을 백엔드가 원하는 최종 path+query로 교체
    req.url = targetPath + reqUrl.search;
    return API_BASE_URL.origin; // host/port/protocol만 타겟으로 넘김
  }

  // 그 외 → Next dev
  return NEXT_URL;
}

const server = https.createServer(
  {
    key: fs.readFileSync("./certs/localhost-key.pem"),
    cert: fs.readFileSync("./certs/localhost.pem"),
  },
  (req, res) => {
    req.headers["x-forwarded-proto"] = "https";
    const target = routeAndRewrite(req);
    proxy.web(req, res, { target });
  }
);

// HMR/WebSocket
server.on("upgrade", (req, socket, head) => {
  const target = routeAndRewrite(req);
  proxy.ws(req, socket, head, { target });
});

server.listen(HTTPS_PORT, () => {
  console.log(`🔐 HTTPS dev proxy on https://localhost:${HTTPS_PORT}`);
  console.log(`   ➜ ${API_PREFIX}/*  → ${API_BASE_URL.href}`);
  console.log(`   ➜ /*              → ${NEXT_URL}`);
});
