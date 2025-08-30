"use client";

import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

interface IExercisePageInfoCardProps {
  title: string;
  description: string;
}

const ExercisePageInfoCard = ({
  title,
  description,
}: IExercisePageInfoCardProps) => {
  const { isPhone, isDesktop } = useMedia();

  return (
    <Stack
      spacing={2}
      sx={{
        borderRadius: [0, 1.5],
        px: [3, 6],
        py: [3, 4.5],
        background: "linear-gradient(270deg, #FC7F36 0%, #FF8A00 100%)",
      }}
    >
      <Typography
        variant={isPhone ? "Headline1" : "Title1"}
        sx={{
          color: (t) => t.palette.static.white,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={isDesktop ? "Heading1" : "Headline1"}
        sx={{
          color: (t) => t.palette.primaryVariants.disabled,
          whiteSpace: "pre-line",
        }}
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default ExercisePageInfoCard;
