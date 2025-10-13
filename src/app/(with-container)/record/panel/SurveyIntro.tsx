"use client";

import { Box, Typography } from "@mui/material";
import SurveyIcon from "@/components/icons/SurveyIcon";
import useMedia from "@/hooks/useMedia";

type SurveyIntroProps = {
  title?: string;
};

export default function SurveyIntro({ title }: SurveyIntroProps) {
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
        {title}
      </Typography>
    </Box>
  );
}
