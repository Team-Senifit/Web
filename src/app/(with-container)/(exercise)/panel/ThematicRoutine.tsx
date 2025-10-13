"use client";

import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import Button from "node_modules/@mui/material/Button/Button";
import React from "react";

const ThematicRoutine = ({ authenticated }: { authenticated: boolean }) => {
  const { isPhone } = useMedia();
  return (
    <Button
      fullWidth
      component={Link}
      href={
        authenticated ? "/exercise/thematic" : "/login?next=/exercise/thematic"
      }
      sx={{
        display: "block",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        p: 0,
        height: "9.5rem",
        boxSizing: "border-box",
        borderRadius: [0, "0.75rem"],
      }}
    >
      <Stack
        spacing={1}
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        sx={{
          bgcolor: "background.paper",
          boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
          borderRadius: [0, "0.75rem"],
          p: [3, 4.5],
        }}
      >
        <Typography
          variant={isPhone ? "Title3" : "Title1"}
          sx={{
            color: "label.normal",
          }}
        >
          {"주제별 운동 프로그램"}
        </Typography>
        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{
            color: "label.neutral",
            whiteSpace: ["pre-line", "normal"],
          }}
        >
          {"인지운동, 부위별 운동, 노래 체조 중\n선택할 수 있어요!"}
        </Typography>
      </Stack>
    </Button>
  );
};

export default ThematicRoutine;
