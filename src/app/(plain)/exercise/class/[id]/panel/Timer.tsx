import { formatTime } from "@/stories/utils/formatTime";
import { Typography } from "@mui/material";
import React from "react";

const Timer = ({
  duration,
  seconds,
  variant,
}: {
  duration: number;
  seconds: number;
  variant: "Headline1" | "Heading1" | "Title1" | "Title2";
}) => {
  return (
    <Typography
      variant={variant}
      sx={{
        color: "labelVariants.neutral",
      }}
    >
      <Typography
        variant={variant}
        component={"span"}
        sx={{
          color: "primary.main",
        }}
      >
        {formatTime(seconds)}
      </Typography>
      {` / ${duration}:00`}
    </Typography>
  );
};

export default Timer;
