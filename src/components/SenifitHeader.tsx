"use client";

import React from "react";
import useMedia from "@/hooks/useMedia";
import { Box, Paper, Stack } from "@mui/material";
import Logo from "@/assets/logo/senifit-logo.svg";
import Image from "next/image";

const SenifitHeader = () => {
  const { isPhone } = useMedia();

  if (isPhone) {
    return null;
  }
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        bgcolor: "background.paper",
        px: [0, 3, 18],
        py: [0, 2, 0],
        height: ["3.5rem", "4rem", "7rem"],
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Image src={Logo} alt="시니핏 로고" />
    </Stack>
  );
};

export default SenifitHeader;
