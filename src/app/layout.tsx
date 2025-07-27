import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./panel/theme";
import { CssBaseline, GlobalStyles } from "@mui/material";

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
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* normalize.css 같은 거 */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
