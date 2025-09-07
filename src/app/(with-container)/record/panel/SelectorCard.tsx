"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type Item = { title: string; control: ReactNode };

export default function SurveyCard({ items }: { items: [Item, Item, Item] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 2,
      }}
    >
      {items.map((it, i) => (
        <Box key={i}>
          <Typography variant={"Title3"} sx={{ mb: 1 }}>
            {it.title}
          </Typography>

          {/* 컨트롤 박스 */}
          <Box
            sx={{
              p: "20px",
              borderRadius: 1.5,
              bgcolor: "fillVariants.alternative",
              border: "2px solid var(--Border-normal, #F2F2F2)",
            }}
          >
            {it.control}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
