"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
  const [endpoint, params] = queryKey as [string, Record<string, unknown>?];

  console.log("🔧 Query endpoint:", endpoint);

  const res = await axiosClient.get(endpoint, { params, signal });
  return res.data;
}

export default function QueryProviders({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locationRef = useRef({ pathname: "/", search: "" });
  const redirectingRef = useRef(false);
  const lastRedirectTimeRef = useRef(0);

  useEffect(() => {
    locationRef.current = {
      pathname: pathname || "/",
      search: searchParams?.toString() || "",
    };
    // 경로가 바뀌면 리다이렉트 플래그 해제
    redirectingRef.current = false;
  }, [pathname, searchParams]);

  const redirectToLogin = (to = "/login") => {
    if (typeof window === "undefined") return;

    // 중복 리다이렉트 방지 (1초 내 중복 요청 차단)
    const now = Date.now();
    if (redirectingRef.current || now - lastRedirectTimeRef.current < 1000) {
      return;
    }

    const { pathname, search } = locationRef.current;
    // 이미 로그인 페이지에 있으면 리다이렉트하지 않음
    if (pathname.startsWith("/login")) return;

    redirectingRef.current = true;
    lastRedirectTimeRef.current = now;

    const next = pathname + (search ? `?${search}` : "");
    router.replace(`${to}?next=${encodeURIComponent(next)}`);

    // 3초 후 플래그 해제 (안전장치)
    setTimeout(() => {
      redirectingRef.current = false;
    }, 3000);
  };

  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (isAuthError(err)) {
              redirectToLogin(err.redirectTo);
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            if (isAuthError(err)) {
              redirectToLogin(err.redirectTo);
            }
          },
        }),
        defaultOptions: {
          queries: {
            queryFn: axiosQueryFn,
            staleTime: 5 * 60_000,
            gcTime: 30 * 60_000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            refetchOnMount: false,
            retry(failureCount, err) {
              // 인증 에러면 재시도하지 않음 (이미 onError에서 처리됨)
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
