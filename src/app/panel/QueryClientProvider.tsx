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
  // 절대 URL이면 그대로, 상대경로면 선행 슬래시 보장
  const endpoint = raw.startsWith("http")
    ? raw
    : raw.startsWith("/")
      ? raw
      : `/${raw}`;

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
