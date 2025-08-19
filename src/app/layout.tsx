import type { Metadata } from "next";
import "./globals.css";
import SenifitThemeProvider from "./panel/SenifitThemeProvider";
import SenifitNavBar from "@/components/SenifitNavBar";
import SenifitHeader from "@/components/SenifitHeader";
import { Container } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
    <html lang="ko">
      <body>
        <SenifitThemeProvider>
          <SenifitHeader />
          <Container
            maxWidth={"desktop"}
            sx={{
              pt: [9, 12, 20.75],
              px: [0, 3],
              pb: [11, 12, 0],
              boxSizing: "border-box",
            }}
          >
            {children}
          </Container>
          <SenifitNavBar />
        </SenifitThemeProvider>
      </body>
    </html>
  );
}
