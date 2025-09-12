import type { Metadata } from "next";
import "./globals.css";
import SenifitThemeProvider from "./panel/SenifitThemeProvider";
import { Suspense } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import QueryProviders from "./panel/QueryClientProvider";
import { AuthErrorBoundary } from "./panel/ErrorBoundary";
import LoadingFallback from "./panel/LoadingFallback";
import Toast from "./panel/Toast";

// dayjs locale 설정, time zone 설정
dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const metadata: Metadata = {
  title: "시니핏",
  description: "시니핏은 시니어를 위한 맞춤형 운동 프로그램을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"ko"}>
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          height: "100dvh",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <QueryProviders>
            <AuthErrorBoundary>
              <SenifitThemeProvider>
                {children}
                <Toast />
              </SenifitThemeProvider>
            </AuthErrorBoundary>
          </QueryProviders>
        </Suspense>
      </body>
    </html>
  );
}
