"use client";

import { Box } from "@mui/material";

export default function RightIcon() {
  return (
    <Box
      sx={(t) => ({
        width: 64,
        height: 64,
        p: "12px 10px 12px 14px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: "100px",
        background: t.palette.static?.white ?? t.palette.common.white,
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
      })}
    >
      <svg
        xmlns={"http://www.w3.org/2000/svg"}
        width={"14"}
        height={"24"}
        viewBox={"0 0 14 24"}
        fill={"none"}
      >
        <path
          d={"M2 22L12 12L2 2"}
          stroke={"#19191A"}
          strokeWidth={"3"}
          strokeLinecap={"round"}
          strokeLinejoin={"round"}
        />
      </svg>
    </Box>
  );
}
