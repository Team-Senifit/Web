import React from "react";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRounded from "@mui/icons-material/VolumeOffRounded";
import FullscreenRounded from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRounded from "@mui/icons-material/FullscreenExitRounded";

const formatTime = (sec: number) =>
  Number.isFinite(sec)
    ? `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`
    : "0:00";

interface Props {
  length: number;
  playing: boolean;
  muted: boolean;
  valueNow: number;
  duration: number;
  bufferedPct: number;
  railBase: string;
  unbuffered: string;
  bufferedColor: string;
  barColor?: string;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  setScrub: (v: number | null) => void;
  onSeek: (sec: number) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  visible?: boolean;
}

export default function VideoControls({
  length,
  playing,
  muted,
  valueNow,
  duration,
  bufferedPct,
  railBase,
  unbuffered,
  bufferedColor,
  barColor = "warning.main",
  onTogglePlay,
  onToggleMute,
  setScrub,
  onSeek,
  isFullscreen,
  onToggleFullscreen,
  visible = true,
}: Props) {
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        zIndex: 200,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        p: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        background: visible
          ? "linear-gradient(to bottom, #0000 0%, #000C 100%)"
          : "transparent",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity .18s ease",
      }}
    >
      <IconButton
        onClick={onTogglePlay}
        aria-label={playing ? "일시정지" : "재생"}
        sx={{ color: "common.white" }}
      >
        {playing ? <PauseRounded /> : <PlayArrowRounded />}
      </IconButton>

      <IconButton
        onClick={onToggleMute}
        aria-label={muted ? "음소거 해제" : "음소거"}
        sx={{ color: "common.white" }}
      >
        {muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
      </IconButton>

      <Typography variant={"body2"} sx={{ minWidth: 90 }}>
        {formatTime(valueNow)} {"/"} {formatTime(length)}
      </Typography>

      <Slider
        aria-label={"재생 위치"}
        value={Number.isFinite(valueNow) ? valueNow : 0}
        min={0}
        max={Number.isFinite(duration) && duration > 0 ? duration : 0}
        step={1}
        onChange={(_, val) => setScrub(val as number)}
        onChangeCommitted={(_, val) => onSeek(val as number)}
        sx={{
          flex: 1,
          "& .MuiSlider-track": { border: "none", bgcolor: barColor },
          "& .MuiSlider-rail": {
            opacity: 1,
            bgcolor: railBase,
            background: `linear-gradient(to right, ${bufferedColor} ${bufferedPct}%, ${unbuffered} ${bufferedPct}%)`,
          },
          "& .MuiSlider-thumb": {
            width: 10,
            height: 10,
            boxShadow: "none",
            "&:before": { boxShadow: "none" },
          },
        }}
      />

      <IconButton
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? "전체화면 종료" : "전체화면"}
        sx={{ color: "common.white" }}
      >
        {isFullscreen ? <FullscreenExitRounded /> : <FullscreenRounded />}
      </IconButton>
    </Box>
  );
}
