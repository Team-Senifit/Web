"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import bgImage from "@/assets/images/customized-routine.png";
import useMedia from "@/hooks/useMedia";

const CustomizedRoutine = () => {
  const { isPhone } = useMedia();
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: [0, 2],
        p: [3, 4.5],
        width: "100%",
        height: ["auto", "40rem", "43rem"],
        bgcolor: "background.paper",
        background: [
          "background.paper",
          "linear-gradient(330deg, #F6C167 3.8%, #FF8A00 46.58%, #FC7F36 84.69%)",
        ],
      }}
    >
      {!isPhone && (
        <Box
          component={Image}
          src={bgImage}
          alt={""}
          width={640}
          height={640}
          sx={{
            width: "40rem",
            height: "40rem",
            position: "absolute",
            top: 0,
            right: 0,
            aspectRatio: "1 / 1",
            pointerEvents: "none",
          }}
          priority
        />
      )}

      {/* Foreground content */}
      <Stack spacing={1} sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant={isPhone ? "Title3" : "Display1"}
          sx={{
            color: ["label.normal", "static.white"],
            whiteSpace: ["normal", "pre-line"],
          }}
        >
          {"맞춤형\n운동 프로그램"}
        </Typography>

        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{
            color: ["label.neutral", "static.white"],
            whiteSpace: "pre-line",
          }}
        >
          {"우리 센터에 딱 맞는 맞춤형 프로그램을\n진행할 수 있어요!"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CustomizedRoutine;
