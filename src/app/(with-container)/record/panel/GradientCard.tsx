"use client";

import { Card } from "@mui/material";
import { PropsWithChildren } from "react";

export default function GradientCard({ children }: PropsWithChildren) {
  return (
    <Card
      sx={{
        display: "flex",
        minHeight: 180,
        p: "36px",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
        borderRadius: "12px",
        background:
          "linear-gradient(98deg, #FFFDFA 50.89%, #FFE3C2 100.93%, #FEDDCC 118.86%)",
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
      }}
    >
      {children}
    </Card>
  );
}
