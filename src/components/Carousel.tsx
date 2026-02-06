import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { Box, IconButton, SxProps, Stack } from "@mui/material";
import React, { useState, ReactNode, useRef } from "react";

interface ICarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth?: number;
  gap?: number;
  padding?: number;
}

const Carousel = <T,>({
  items,
  renderItem,
  itemWidth = 240, // px
  gap = 4, // spacing
  padding = 4, // spacing
}: ICarouselProps<T>) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const iconButtonStyle: SxProps = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: "4rem !important",
    height: "4rem !important",
    color: "label.normal",
    bgcolor: "background.paper",
    borderRadius: "50% !important",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(items.length - 1, prev + 1));
  };

  return (
    <Box ref={containerRef} sx={{ position: "relative", overflow: "hidden" }}>
      {/* 이전 버튼 */}
      <IconButton
        id={"click_Carousel"}
        sx={{
          ...iconButtonStyle,
          left: "1rem",
          display: currentSlide === 0 ? "none" : "flex",
        }}
        onClick={handlePrevious}
      >
        <ChevronLeft
          sx={{
            fontSize: "2.5rem",
          }}
        />
      </IconButton>

      {/* 다음 버튼 */}
      <IconButton
        id={"click_Carousel"}
        sx={{
          ...iconButtonStyle,
          right: "1rem",
          display: currentSlide === items.length - 1 ? "none" : "flex",
        }}
        onClick={handleNext}
      >
        <ChevronRight
          sx={{
            fontSize: "2.5rem",
          }}
        />
      </IconButton>

      {/* 캐러셀 트랙 */}
      <Stack
        direction={"row"}
        sx={{
          transform: `translateX(-${currentSlide * (itemWidth + gap * 8)}px)`,
          transition: "transform 0.3s ease-in-out",
          gap,
          p: padding,
        }}
      >
        {items.map((item, index) => renderItem(item, index))}
      </Stack>
    </Box>
  );
};

export default Carousel;
