"use client";

import React, { Component, PropsWithChildren } from "react";
import { isAuthError } from "@/apis/errors";
import LoadingFallback from "./LoadingFallback";

interface IErrorState {
  hasError: boolean;
  error: Error | null;
}

export class AuthErrorBoundary extends Component<
  PropsWithChildren,
  IErrorState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): IErrorState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔴 Error Boundary caught:", error, errorInfo);

    // 인증 에러면 로그인 페이지로 리다이렉트
    if (isAuthError(error)) {
      console.log("🔄 Redirecting to login...");
      // 현재 경로 보존
      const currentPath = window.location.pathname + window.location.search;
      const loginUrl = `${error.redirectTo}?next=${encodeURIComponent(currentPath)}`;
      // 즉시 리다이렉트
      window.location.href = loginUrl;
    }
  }

  render() {
    if (this.state.hasError) {
      const error = this.state.error;

      // 인증 에러인 경우 로딩 표시 (리다이렉트 중)
      if (isAuthError(error)) {
        // 로딩 리다이렉트 토스트 넣기
        return <LoadingFallback />;
      }

      // 기타 에러
      // 개발환경인지 체크
      if (process.env.NODE_ENV === "development") {
        return (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "#d32f2f",
            }}
          >
            <h2>{"오류가 발생했습니다"}</h2>
            <details style={{ marginTop: "16px", textAlign: "left" }}>
              <summary>{"에러 상세 정보"}</summary>
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "4px",
                  overflow: "auto",
                  marginTop: "8px",
                }}
              >
                {error?.message || "알 수 없는 오류"}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: "16px",
                padding: "8px 16px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {"페이지 새로고침"}
            </button>
          </div>
        );
      } else {
        // 운영환경에서는 아무것도 렌더링하지 않음
        return null;
      }
    }

    return this.props.children;
  }
}
