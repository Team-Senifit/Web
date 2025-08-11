"use client";

import { SquareUserRoundIcon } from "@/components/icons";
import useMedia from "@/hooks/useMedia";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const InfoCard = () => {
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
        <SquareUserRoundIcon strokeWidth={2} sx={{ color: "label.neutral" }} />
        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: "label.neutral" }}
        >
          {"등록 어르신 관리하기"}
        </Typography>
      </Stack>
      {isDesktop && (
        <Button>
          <Typography variant="Heading1" sx={{ color: "label.normal" }}>
            {"어르신 등록하기"}
          </Typography>
        </Button>
      )}
    </Stack>
  );
};

export default InfoCard;
