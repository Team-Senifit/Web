import "server-only";
import axios, { AxiosHeaders, type AxiosInstance } from "axios";
import https from "node:https";
import { headers as nextHeaders } from "next/headers";
import { AuthError } from "./errors";

const API_PREFIX = normalizePrefix(process.env.NEXT_PUBLIC_API_BASE ?? "/api");
const SITE_URL = ensureOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000",
);

const devHttpsAgent =
  process.env.NODE_ENV !== "production"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

function ensureOrigin(v: string) {
  // 'localhost:3000' 처럼 스킴이 빠진 값이 와도 보정
  if (!/^https?:\/\//i.test(v)) return `https://${v}`;
  return v;
}
function normalizePrefix(p: string) {
  return p.startsWith("/") ? p : `/${p}`;
}

export async function createAxiosServer(opts?: {
  forwardCookies?: boolean; // default: true
  extraHeaders?: Record<string, string | number | boolean | undefined>;
}): Promise<AxiosInstance> {
  // ✅ 헤더 의존 대신 env 기반으로 절대 baseURL 생성
  const baseURL = new URL(API_PREFIX, SITE_URL).toString(); // e.g. https://localhost:3000/api

  // 쿠키 전달 (SSR 세션 유지용)
  const h = await nextHeaders();
  const cookie = opts?.forwardCookies === false ? "" : (h.get("cookie") ?? "");

  const instance = axios.create({
    baseURL,
    withCredentials: true,
    httpsAgent: devHttpsAgent, // 자가서명 허용(개발)
  });

  instance.interceptors.request.use((config) => {
    const hdrs = AxiosHeaders.from(config.headers);
    if (cookie) hdrs.set("cookie", cookie);
    if (opts?.extraHeaders) {
      for (const [k, v] of Object.entries(opts.extraHeaders)) {
        if (typeof v !== "undefined") hdrs.set(k, String(v));
      }
    }
    config.headers = hdrs;
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const s = err?.response?.status;
      if (s === 401 || s === 403) throw new AuthError("/login");
      throw err;
    },
  );

  return instance;
}
