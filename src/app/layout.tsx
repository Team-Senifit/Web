import type { Metadata } from "next";
import "./globals.css";
import SenifitThemeProvider from "./panel/SenifitThemeProvider";
import { Suspense } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import QueryProviders from "./panel/QueryClientProvider";
import LoadingFallback from "./panel/LoadingFallback";
import Toast from "@/components/Toast";

// dayjs locale 설정, time zone 설정
dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const metadata: Metadata = {
  title: "시니핏",
  description: "시니핏은 시니어를 위한 맞춤형 운동 프로그램을 제공합니다.",
  openGraph: {
    title: "시니핏",
    description: "시니핏은 시니어를 위한 맞춤형 운동 프로그램을 제공합니다.",
    url: "https://senifit.co.kr",
    siteName: "시니핏",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 600,
        alt: "시니핏 로고",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "시니핏",
    description: "시니핏은 시니어를 위한 맞춤형 운동 프로그램을 제공합니다.",
    images: ["/og-image.png"],
  },
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
            <SenifitThemeProvider>
              {children}
              <Toast />
            </SenifitThemeProvider>
          </QueryProviders>
        </Suspense>
      </body>
    </html>
  );
}
