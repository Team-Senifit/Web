"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { axiosClient } from "@/apis/axiosClient";
import { isAuthError } from "@/apis/errors";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () =>
          import("@tanstack/react-query-devtools").then(
            (m) => m.ReactQueryDevtools,
          ),
        { ssr: false },
      )
    : () => null;

async function axiosQueryFn({
  queryKey,
  signal,
}: {
  queryKey: readonly unknown[];
  signal?: AbortSignal;
}) {
  const [raw, params] = queryKey as [string, Record<string, unknown>?];

  if (typeof raw !== "string" || raw.length === 0) {
    throw new Error(`Bad endpoint in queryKey: ${String(raw)}`);
  }

  // 1. 서버 환경(SSR)인지 확인
  const isServer = typeof window === "undefined";

  // 환경 변수에서 값 가져오기
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "/api";

  let endpoint = raw;

  if (!raw.startsWith("http")) {
    // 1. "/"로 시작하지 않으면 붙여줌
    const path = raw.startsWith("/") ? raw : `/${raw}`;

    if (isServer) {
      // 2. 서버일 때는 SITE_URL + API_BASE + path 전체 경로 조립
      // 예: https://localhost:3000 + /api + /health
      endpoint = `${siteUrl}${apiBase}${path}`;
    } else {
      // 3. 클라이언트일 때는 axiosClient의 baseURL(/api)이 있으므로 path만 전달
      endpoint = path;
    }
  }

  const res = await axiosClient.get(endpoint, { params, signal });
  return res.data;
}

export default function QueryProviders({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locationRef = useRef({ pathname: "/", search: "" });
  const redirectingRef = useRef(false);

  useEffect(() => {
    locationRef.current = {
      pathname: pathname || "/",
      search: searchParams?.toString() || "",
    };
    // 경로가 바뀌면 리다이렉트 플래그 해제
    redirectingRef.current = false;
  }, [pathname, searchParams]);

  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({}),
        mutationCache: new MutationCache({}),
        defaultOptions: {
          queries: {
            queryFn: axiosQueryFn,
            staleTime: 5 * 60_000,
            gcTime: 30 * 60_000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            refetchOnMount: false,
            retry(failureCount, err) {
              if (isAuthError(err)) {
                return false;
              }

              // 5xx 에러만 최대 2회 재시도
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const status = (err as any)?.response?.status;
              return status >= 500 && failureCount < 2;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
