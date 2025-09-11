"use client";

import { Box, Typography } from "@mui/material";
import { useRef, useMemo } from "react";
import RightIcon from "@/components/icons/RightIcon";
import LeftIcon from "@/components/icons/LeftIcon";
import useMedia from "@/hooks/useMedia";

type Routine = {
  id: number;
  name: string;
  thumbnail_path: string;
};

export default function RoutineImage({ routines }: { routines: Routine[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const hasScroll = useMemo(() => (routines?.length ?? 0) > 0, [routines]);

  const scrollBy = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

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
      {/* 좌우 화살표 */}
      {hasScroll && (
        <>
          <Box
            onClick={() => scrollBy(-320)}
            sx={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 1,
            }}
            aria-label={"scroll left"}
          >
            <LeftIcon />
          </Box>

          <Box
            onClick={() => scrollBy(320)}
            sx={{
              position: "absolute",
              top: "50%",
              right: 16,
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 1,
            }}
            aria-label={"scroll right"}
          >
            <RightIcon />
          </Box>
        </>
      )}

      {/* 썸네일 리스트 */}
      <Box
        ref={scrollerRef}
        sx={{
          display: "flex",
          gap: 4,
          overflowX: "auto",
          scrollBehavior: "smooth",
          pr: 8,
          pl: 8,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.15)",
            borderRadius: 4,
          },
        }}
      >
        {(routines ?? []).map((r) => (
          <Box key={r.id} sx={{ minWidth: 240, maxWidth: 240 }}>
            <Box
              component={"img"}
              src={r.thumbnail_path}
              alt={r.name}
              sx={{
                width: 240,
                height: 240,
                objectFit: "cover",
                display: "block",
                borderRadius: 1.5,
                backgroundColor: "rgba(0,0,0,0.03)",
              }}
            />
            <Typography
              variant={"Heading1"}
              sx={{ mt: 2, textAlign: "center" }}
            >
              {r.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
