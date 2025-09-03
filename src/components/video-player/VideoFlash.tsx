import React from "react";
import { Box } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import { keyframes } from "@mui/system";

const pulseKF = keyframes`
  0%   { opacity: 0; transform: scale(.92); }
  20%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.15); }
`;

export default function VideoFlash({
  kind,
  seq,
}: {
  kind: "play" | "pause" | null;
  seq: number;
}) {
  if (!kind) return null;
  return (
    <Box
      key={seq}
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        zIndex: 2,
        animation: `${pulseKF} 680ms ease-out`,
      }}
      aria-hidden
    >
      <Box
        sx={{
          p: 1.25,
          borderRadius: "9999px",
          bgcolor: "rgba(0,0,0,.45)",
          backdropFilter: "blur(2px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        {kind === "play" ? (
          <PlayArrowRounded sx={{ fontSize: 72, color: "common.white" }} />
        ) : (
          <PauseRounded sx={{ fontSize: 72, color: "common.white" }} />
        )}
      </Box>
    </Box>
  );
}
