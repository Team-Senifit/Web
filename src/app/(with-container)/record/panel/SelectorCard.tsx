"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import useMedia from "@/hooks/useMedia";

type Item = { title: string; control: ReactNode };
type Props = { items: [Item, Item, Item]; step?: 0 | 1 | 2 };

export default function SelectorCard({ items, step }: Props) {
  const { isPhone, isTablet } = useMedia();
  const titleVariant = isPhone ? "Headline1" : "Title3";
  const cols = isTablet || isPhone ? 1 : 3;

  const renderItems =
    isPhone && typeof step === "number" ? [items[step]] : items;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 2,
      }}
    >
      {renderItems.map((it, i) => (
        <Box key={i}>
          <Typography variant={titleVariant} sx={{ mb: 1 }}>
            {it.title}
          </Typography>

          {/* 컨트롤 박스 */}
          <Box
            sx={(t) => ({
              p: "20px",
              borderRadius: 1.5,
              bgcolor: t.palette.fillVariants.alternative,
              border: `2px solid ${t.palette.borderVariants.normal}`,
            })}
          >
            {it.control}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
