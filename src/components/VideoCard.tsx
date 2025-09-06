import { IWorkoutVideo } from "@/types/IRoutineDetail";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const VideoCard = ({ thumbnail_path, name }: IWorkoutVideo) => {
  return (
    <Stack direction={"column"} spacing={2}>
      <Image
        src={thumbnail_path}
        alt={name}
        height={240}
        width={240}
        style={{
          width: "15rem",
          height: "15rem",
          aspectRatio: "1 / 1",
          pointerEvents: "none",
          objectFit: "cover",
        }}
      />
      <Typography
        variant={"Heading1"}
        title={name}
        sx={{
          width: "15rem",
          color: "label.neutral",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
        mt={1}
        align={"center"}
      >
        {name}
      </Typography>
    </Stack>
  );
};

export default VideoCard;
