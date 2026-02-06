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
// import Script from "next/script";

// dayjs locale 설정, time zone 설정
dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

export const metadata: Metadata = {
  metadataBase: new URL("https://senifit.co.kr"),
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
  verification: {
    other: {
      "naver-site-verification": "67fa042a3147505c9d35bd75c00b4d0b015ac1b7",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"ko"}>
      <head>
        {/* Google Tag Manager */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TSB9PTJB');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          height: "100dvh",
        }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={"https://www.googletagmanager.com/ns.html?id=GTM-TSB9PTJB"}
            height={"0"}
            width={"0"}
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
