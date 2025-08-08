"use client";

import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

const InfoCard = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => {
  const { isPhone } = useMedia();
  return (
    <Stack
      component={"section"}
      direction="column"
      justifyContent={"space-between"}
      alignItems={"start"}
      sx={{
        bgcolor: "background.paper",
        borderRadius: [0, "0.75rem"],
        padding: 2,
        width: 1, // width, height에서는 1이 100%를 의미
        minHeight: ["11rem", "12.75rem", "13.25rem"],
      }}
    >
      <Stack
        direction={"column"}
        spacing={1}
        sx={{
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        {icon}
        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: "label.neutral" }}
        >
          {title}
        </Typography>
      </Stack>
      <Typography
        variant={isPhone ? "Headline1" : "Heading1"}
        sx={{ color: "label.normal", wordBreak: "keep-all" }}
      >
        {content}
      </Typography>
    </Stack>
  );
};

export default InfoCard;
