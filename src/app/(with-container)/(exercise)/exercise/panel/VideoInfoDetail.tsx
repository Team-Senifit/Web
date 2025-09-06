"use client";

import { IWorkoutVideo } from "@/types/IRoutineDetail";
import { Box } from "@mui/material";
import React from "react";
import VideoCard from "../../../../../components/VideoCard";
import Carousel from "@/components/Carousel";
import SenifitAccordion from "@/components/SenifitAccordion";

const VideoInfoDetail = ({ videos }: { videos: IWorkoutVideo[] }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "3.5rem",
        width: "100%",
      }}
    >
      <SenifitAccordion title={"운동 자세히 보기"}>
        <Carousel
          items={videos}
          renderItem={(video, index) => <VideoCard key={index} {...video} />}
          itemWidth={216}
          gap={4}
          padding={4}
        />
      </SenifitAccordion>
    </Box>
  );
};

export default VideoInfoDetail;
