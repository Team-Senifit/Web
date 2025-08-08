"use client";
import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

const PageInfoCard = () => {
  const { isPhone, isTablet } = useMedia();

  return (
    <Stack
      direction="column"
      spacing={1}
      alignItems="start"
      justifyContent="center"
      sx={{
        px: [3, 6],
        py: [3, 4.5],
        borderRadius: [0, "0.75rem"],
        background:
          "linear-gradient(270deg, var(--RedOrange-60, #FC7F36) 0%, #FF8A00 100%)",
      }}
    >
      <Typography
        variant={isPhone ? "Headline1" : "Headline2"}
        sx={{
          color: "primaryVariants.disabled",
        }}
      >
        {"우리 센터"}
      </Typography>
      <Typography
        variant={isPhone ? "Headline1" : isTablet ? "Title2" : "Title1"}
        sx={{
          color: "static.white",
          whiteSpace: ["pre-line", "normal"],
        }}
      >
        {"센터에 등록된 어르신을\n관리할 수 있어요."}
      </Typography>
    </Stack>
  );
};

export default PageInfoCard;
