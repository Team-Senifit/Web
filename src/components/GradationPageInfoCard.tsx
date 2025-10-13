"use client";

import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

interface IGradationPageInfoCardProps {
  title: string;
  description: string;
  descriptionWhiteSpace?: Array<"normal" | "pre-line"> | "normal" | "pre-line";
  accentDescription?: boolean;
}

const GradationPageInfoCard = ({
  title,
  description,
  descriptionWhiteSpace = "pre-line",
  accentDescription = false,
}: IGradationPageInfoCardProps) => {
  const { isPhone, isDesktop } = useMedia();

  return (
    <Stack
      gap={2}
      sx={{
        borderRadius: [0, "0.75rem"],
        px: [3, 6],
        py: [3, 4.5],
        background: "linear-gradient(270deg, #FC7F36 0%, #FF8A00 100%)",
      }}
    >
      <Typography
        variant={isPhone ? "Headline1" : "Title1"}
        sx={{
          color: accentDescription
            ? "primaryVariants.disabled"
            : "static.white",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={isDesktop ? "Heading1" : "Headline1"}
        sx={{
          color: accentDescription
            ? "static.white"
            : "primaryVariants.disabled",

          whiteSpace: descriptionWhiteSpace,
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default GradationPageInfoCard;
