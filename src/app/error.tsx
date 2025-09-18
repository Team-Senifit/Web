"use client";

import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isAuthError } from "@/apis/errors";
import LoadingFallback from "./panel/LoadingFallback";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("🔴 Error Boundary caught:", error);

    // 인증 에러면 로그인 페이지로 리다이렉트
    if (isAuthError(error)) {
      console.log("🔄 Redirecting to login...");
      // 현재 경로 보존
      const currentPath = window.location.pathname + window.location.search;
      const loginUrl = `${error.redirectTo}?next=${encodeURIComponent(currentPath)}`;
      // 즉시 리다이렉트
      window.location.href = loginUrl;
    }
  }, [error]);

  // 인증 에러인 경우 로딩 표시 (리다이렉트 중)
  if (isAuthError(error)) {
    return <LoadingFallback />;
  }

  // 기타 에러
  // 개발환경인지 체크
  if (process.env.NODE_ENV === "development") {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          color: "error.main",
        }}
      >
        <Typography variant={"h4"} component={"h2"} gutterBottom>
          {"오류가 발생했습니다"}
        </Typography>

        <Accordion sx={{ mt: 2, textAlign: "left" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{"에러 상세 정보"}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper
              sx={{
                backgroundColor: "grey.100",
                p: 1,
                borderRadius: 1,
                overflow: "auto",
              }}
            >
              <Typography
                component={"pre"}
                variant={"body2"}
                sx={{
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {error?.message || "알 수 없는 오류"}
              </Typography>
            </Paper>
            {error.digest && (
              <Typography
                variant={"caption"}
                color={"text.secondary"}
                sx={{ mt: 1, display: "block" }}
              >
                {"Digest: "}
                {error.digest}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"center"}
          sx={{ mt: 2 }}
        >
          <Button variant={"contained"} color={"primary"} onClick={reset}>
            {"다시 시도"}
          </Button>
          <Button
            variant={"contained"}
            color={"inherit"}
            onClick={() => window.location.reload()}
          >
            {"페이지 새로고침"}
          </Button>
        </Stack>
      </Box>
    );
  } else {
    // 운영환경에서는 아무것도 렌더링하지 않음
    return null;
  }
};

export default Error;
