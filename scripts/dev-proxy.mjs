import "dotenv/config";
import fs from "node:fs";
import https from "node:https";
import httpProxy from "http-proxy";
import { URL } from "node:url";

// ── 설정 ───────────────────────────────────────────────────────────────────────
const HTTPS_PORT = 3000;
const NEXT_URL = process.env.NEXT_URL || "http://127.0.0.1:3001";
const API_PREFIX = process.env.API_PREFIX || "/api";

// .env 예: NEXT_PUBLIC_API_URL=https://dev.api.example.com/api
let apiBase = process.env.NEXT_PUBLIC_API_URL;
if (apiBase && /^["'].*["']$/.test(apiBase)) apiBase = apiBase.slice(1, -1); // 따옴표 제거
apiBase = apiBase?.trim();
if (!apiBase) {
  console.error("❌ NEXT_PUBLIC_API_URL 이(가) .env에 설정되어 있지 않습니다.");
  process.exit(1);
}
let API_BASE_URL;
try {
  API_BASE_URL = new URL(apiBase);
} catch {
  console.error(
    `❌ NEXT_PUBLIC_API_URL 값이 올바른 URL이 아닙니다: ${apiBase}`,
  );
  process.exit(1);
}

const REQUEST_TIMEOUT_MS = 10000;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  secure: false, // self-signed 허용(개발)
  ws: true,
  xfwd: true,
  timeout: REQUEST_TIMEOUT_MS,
  proxyTimeout: REQUEST_TIMEOUT_MS,
});

// ✅ 에러 핸들러: 프로세스가 죽지 않도록 502로 응답
proxy.on("error", (err, req, res) => {
  const target = req?.__target || "unknown";
  console.error("🔴 Proxy error:", err.code || err.message, "→", target);
  try {
    if (!res.headersSent) res.writeHead(502, { "Content-Type": "text/plain" });
    res.end(`Bad Gateway (proxy to ${target})\n${err.code || err.message}`);
  } catch {}
});

// ✅ 쿠키 리라이트(문자열/배열 모두 안전)
proxy.on("proxyRes", (proxyRes, req, res) => {
  const raw = proxyRes.headers["set-cookie"];
  if (!raw) return;
  const arr = Array.isArray(raw) ? raw : [raw];
  const rewritten = arr.map((c) => {
    let v = c.replace(/;\s*Domain=[^;]+/i, "; Domain=localhost");
    if (!/;\s*Secure/i.test(v)) v += "; Secure"; // 중복 방지
    return v;
  });
  res.setHeader("set-cookie", rewritten);
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
    const strippedPath = reqUrl.pathname.slice(API_PREFIX.length) || "/";
    const targetPath = joinPath(API_BASE_URL.pathname || "/", strippedPath);
    req.url = targetPath + reqUrl.search;
    return API_BASE_URL.origin; // ex) https://dev.api.example.com
  }
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
    req.__target = target; // ✅ 에러 로그에 타겟 표시
    proxy.web(req, res, { target });
  },
);

// HMR/WebSocket
server.on("upgrade", (req, socket, head) => {
  const target = routeAndRewrite(req);
  req.__target = target; // ✅ 에러 로그에 타겟 표시
  proxy.ws(req, socket, head, { target });
});

// ✅ TLS 핸드셰이크 중 에러도 먹어주기
server.on("clientError", (err, socket) => {
  console.error("🔴 clientError:", err.code || err.message);
  try {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  } catch {}
});

server.listen(HTTPS_PORT, () => {
  console.log(`🔐 HTTPS dev proxy on https://localhost:${HTTPS_PORT}`);
  console.log(`   ➜ ${API_PREFIX}/*  → ${API_BASE_URL.href}`);
  console.log(`   ➜ /*              → ${NEXT_URL}`);
});
