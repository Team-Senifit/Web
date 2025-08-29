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
import { isAxiosError } from "axios";
import { axiosClient } from "@/apis/axiosClient";

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

// 공통 axios 기반 queryFn
async function axiosQueryFn({
  queryKey,
  signal,
}: {
  queryKey: readonly unknown[];
  signal?: AbortSignal;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [endpoint, params] = queryKey as [string, Record<string, any>?];
  const res = await axiosClient.get(endpoint, { params, signal });
  return res.data;
}

export default function QueryProviders({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 최신 경로/쿼리 보관용 ref
  const locationRef = useRef({ pathname: "/", search: "" });
  useEffect(() => {
    locationRef.current = {
      pathname: pathname || "/",
      search: searchParams?.toString() || "",
    };
  }, [pathname, searchParams]);

  // 중복 리다이렉트 방지
  const redirectingRef = useRef(false);
  const redirectToLogin = () => {
    if (typeof window === "undefined") return; // SSR 안전장치
    if (redirectingRef.current) return;

    const { pathname, search } = locationRef.current;
    if (pathname.startsWith("/login")) return; // 로그인 페이지면 패스

    redirectingRef.current = true;
    const next = pathname + (search ? `?${search}` : "");
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  };

  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            const status = isAxiosError(err)
              ? err.response?.status
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (err as any)?.status;
            if (status === 401 || status === 403) redirectToLogin();
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            const status = isAxiosError(err)
              ? err.response?.status
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (err as any)?.status;
            if (status === 401 || status === 403) redirectToLogin();
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 5 * 60_000,
            gcTime: 30 * 60_000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: "always",
            refetchOnMount: false,
            retry(failureCount, err) {
              const status = isAxiosError(err)
                ? err.response?.status
                : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (err as any)?.status;
              // 5xx만 최대 2회 재시도
              return !!status && status >= 500 && failureCount < 2;
            },
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
            queryFn: axiosQueryFn,
          },
          mutations: { retry: 0 },
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
