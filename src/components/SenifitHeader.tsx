"use client";

import React from "react";
import useMedia from "@/hooks/useMedia";
import { Box, Paper } from "@mui/material";
import Logo from "@/assets/logo/senifit-logo.svg";
import Image from "next/image";

const SenifitHeader = () => {
  const { isPhone } = useMedia();

  if (isPhone) {
    return null;
  }
  return (
    <Paper
      sx={{
        bgcolor: "background.paper",
        px: [0, 3, 18],
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Image src={Logo} alt="시니핏 로고" />
    </Paper>
  );
};

export default SenifitHeader;
