"use client";

import { Box } from "@mui/material";
import { useRef, useMemo } from "react";
// import RightIcon from "@/components/icons/RightIcon";
// import LeftIcon from "@/components/icons/LeftIcon";
import useMedia from "@/hooks/useMedia";
import Carousel from "@/components/Carousel";
import VideoCard from "@/components/VideoCard";

type Routine = {
  id: number;
  name: string;
  thumbnail_path: string;
};

export default function RoutineImage({ routines }: { routines: Routine[] }) {
  // 모바일에서는 숨김, 태블릿/데스크탑에서만 표시
  const { isPhone } = useMedia();
  if (isPhone) return null;

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
        position: "relative",
        p: 4,
        gap: 4,
        borderRadius: "12px",
        background: (t) => t.palette.bg?.normal ?? t.palette.background.paper,
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
        overflow: "hidden",
      }}
    >
      {/* 썸네일 리스트 */}

      <Carousel
        items={routines}
        renderItem={(routine, index) => (
          <VideoCard
            key={index}
            name={routine.name}
            thumbnail_path={routine.thumbnail_path}
          />
        )}
        itemWidth={240}
        gap={4}
        padding={4}
      />
    </Box>
  );
}
