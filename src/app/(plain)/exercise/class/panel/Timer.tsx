import { Typography } from "@mui/material";
import React, { useEffect } from "react";

const Timer = ({
  duration,
  seconds,
  setSeconds,
  variant,
}: {
  duration: number;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  variant: "Headline1" | "Heading1" | "Title1" | "Title2";
}) => {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval as NodeJS.Timeout);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
