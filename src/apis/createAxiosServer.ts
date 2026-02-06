import "server-only";
import axios, { AxiosHeaders, type AxiosInstance } from "axios";
import https from "node:https";
import { headers as nextHeaders } from "next/headers";
import { AuthError } from "./errors";

const API_PREFIX = normalizePrefix(process.env.NEXT_PUBLIC_API_BASE ?? "/api");
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "")
  .trim()
  .replace(/\/+$/, "");
const ENV_SITE_URL = ensureOrigin(process.env.NEXT_PUBLIC_SITE_URL);

const devHttpsAgent =
  process.env.NODE_ENV !== "production"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

function ensureOrigin(v?: string) {
  if (!v) return undefined;
  // 'localhost:3000' 처럼 스킴이 빠진 값이 와도 보정
  const normalized = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const url = new URL(normalized);
    if (!url.hostname) throw new Error("Missing hostname");
    return url.origin;
  } catch {
    return undefined;
  }
}

function originFromHeaders(h: Headers) {
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host");
  if (!host) return undefined;
  return `${proto}://${host}`;
}
function normalizePrefix(p: string) {
  return p.startsWith("/") ? p : `/${p}`;
}

export async function createAxiosServer(opts?: {
  forwardCookies?: boolean; // default: true
  extraHeaders?: Record<string, string | number | boolean | undefined>;
}): Promise<AxiosInstance> {
  // 쿠키 전달 (SSR 세션 유지용)
  const h = await nextHeaders();
  // API URL이 있으면 직접 사용, 없으면 요청 헤더 기반으로 /api 프록시 사용
  const siteOrigin =
    ENV_SITE_URL || originFromHeaders(h) || "https://localhost:3000";
  const baseURL = API_BASE_URL
    ? API_BASE_URL
    : new URL(API_PREFIX, siteOrigin).toString();
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
