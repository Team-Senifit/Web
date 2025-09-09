"use client";

import { Box, Typography } from "@mui/material";
import SurveyIcon from "@/components/icons/SurveyIcon";
import useMedia from "@/hooks/useMedia";

export default function SurveyIntro() {
  const { isPhone } = useMedia();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <SurveyIcon
        sx={{
          color: (t) => t.palette.label.neutral,
          fontSize: isPhone ? 16 : 24,
        }}
      />
      <Typography variant={isPhone ? "Headline1" : "Heading1"}>
        {"수업 기록 작성하기"}
      </Typography>
    </Box>
  );
}
