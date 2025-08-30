"use client";

import Tag from "@/components/Tag";
import useMedia from "@/hooks/useMedia";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const VideoInfoCard = ({ name, thumbnail_path, duration }: IPopularRoutine) => {
  const { isPhone } = useMedia();
  return (
    <Stack direction={"row"} spacing={3} width={"100%"}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: [undefined, "17.75rem"],
          overflow: "hidden",
          aspectRatio: ["38/22", "71/40"],
          borderRadius: "0.75rem",
        }}
      >
        <Image
          src={thumbnail_path}
          alt={name}
          fill
          style={{
            objectFit: "cover",
          }}
        />
        {isPhone && (
          <Stack
            direction={"column"}
            spacing={0.5}
            alignItems={"flex-start"}
            p={2}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Typography variant={"Heading1"} color={"label.normal"}>
              {name}
            </Typography>
            <Tag label={`${duration}분`} />
          </Stack>
        )}
      </Box>
      {!isPhone && (
        <Stack direction={"column"} spacing={0.5} pt={0.5}>
          <Typography
            variant={"Heading1"}
            sx={{
              color: "label.normal",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant={"Headline1"}
            sx={{
              color: "label.neutral",
              textAlign: "left",
            }}
          >
            {`${duration}분`}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default VideoInfoCard;
