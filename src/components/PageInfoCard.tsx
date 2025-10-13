"use client";

import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

export interface IPageInfoCardProps {
  icon: React.ReactNode;
  title: string;
  endAction?: React.ReactNode;
  color?: string;
}

const PageInfoCard = ({
  icon,
  title,
  endAction,
  color = "label.neutral",
}: IPageInfoCardProps) => {
  const { isPhone, isDesktop } = useMedia();
  return (
    <Stack
      component={"section"}
      direction={"row"}
      width={1}
      justifyContent={"space-between"}
      sx={{
        width: 1, // width, height에서는 1이 100%를 의미
      }}
    >
      <Stack
        direction={"column"}
        spacing={1}
        alignItems={"start"}
        justifyContent={"center"}
      >
        {icon}
        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: color }}
        >
          {title}
        </Typography>
      </Stack>
      {isDesktop && endAction}
    </Stack>
  );
};

export default PageInfoCard;
