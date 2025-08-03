import type { Metadata } from "next";
import "./globals.css";
import SenifitThemeProvider from "./panel/SenifitThemeProvider";
import SenifitNavBar from "@/components/SenifitNavBar";

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
    <html lang="ko">
      <body>
        <SenifitThemeProvider>
          {children}
          <SenifitNavBar />
        </SenifitThemeProvider>
      </body>
    </html>
  );
}
