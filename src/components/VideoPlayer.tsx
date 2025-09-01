"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box, IconButton, Slider, Stack, Typography } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRounded from "@mui/icons-material/VolumeOffRounded";

export interface IVideoHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  mute: (m?: boolean) => void;
  seek: (timeSec: number) => void;
  getEl: () => HTMLVideoElement | null;
}

export interface IMinimalVideoPlayerProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "onTimeUpdate"> {
  src: string;
  poster?: string;
  railVariant?: "light" | "dark";
  barColor?: string; // e.g. "warning.main" | "#FF7A00"
  autoPlayOnSourceChange?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
  onMuteChange?: (muted: boolean) => void;
  onTimeUpdateSec?: (current: number, duration: number) => void;

  /** 비디오 표시 여부(기본 true). false면 '바만 보이는' 모드 */
  showVideo?: boolean;

  /** CSS aspect-ratio (기본 16/9). ex) "4 / 3" 또는 1.7778 */
  aspectRatio?: string | number;

  /** 뷰포트 높이를 넘기지 않도록 자동으로 width 제한 (기본 true) */
  fitViewport?: boolean;

  /** 상단 고정 헤더 등 높이 보정(px). fitViewport=true일 때만 사용 */
  viewportOffsetPx?: number;
}

const formatTime = (sec: number) => {
  if (!Number.isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const bufferedEnd = (v: HTMLVideoElement) => {
  const { buffered, currentTime } = v;
  for (let i = 0; i < buffered.length; i++) {
    const start = buffered.start(i);
    const end = buffered.end(i);
    if (currentTime >= start && currentTime <= end) return end;
  }
  return buffered.length ? buffered.end(buffered.length - 1) : 0;
};

/** "16 / 9" | "16/9" | 1.777... 모두 숫자로 변환 */
const parseAspectRatioToNumber = (ar?: string | number): number => {
  if (typeof ar === "number" && Number.isFinite(ar)) return ar;
  if (typeof ar === "string") {
    const trimmed = ar.replace(/\s+/g, "");
    const m = trimmed.match(/^(\d+(?:\.\d+)?)[/:](\d+(?:\.\d+)?)$/);
    if (m) {
      const a = parseFloat(m[1]);
      const b = parseFloat(m[2]);
      if (b !== 0) return a / b;
    }
    const asNum = Number(trimmed);
    if (Number.isFinite(asNum)) return asNum;
  }
  return 16 / 9; // fallback
};

const MinimalVideoPlayer = forwardRef<IVideoHandle, IMinimalVideoPlayerProps>(
  function MinimalVideoPlayer(
    {
      src,
      poster,
      railVariant = "light",
      barColor = "warning.main",
      preload = "metadata",
      autoPlayOnSourceChange = true,
      onPlayStateChange,
      onMuteChange,
      onTimeUpdateSec,
      onEnded,
      showVideo = true,
      aspectRatio = "16 / 9",
      fitViewport = true,
      viewportOffsetPx = 0,
      ...rest
    },
    ref,
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: async () =>
        videoRef.current ? videoRef.current.play() : Promise.resolve(),
      pause: () => {
        videoRef.current?.pause();
      },
      toggle: () => {
        const v = videoRef.current;
        if (!v) return;
        v.paused ? v.play() : v.pause();
      },
      mute: (m?: boolean) => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = typeof m === "boolean" ? m : !v.muted;
        setMuted(v.muted);
        onMuteChange?.(v.muted);
      },
      seek: (time) => {
        const v = videoRef.current;
        if (v) v.currentTime = Math.max(0, Math.min(time, v.duration || time));
      },
      getEl: () => videoRef.current,
    }));

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [scrub, setScrub] = useState<number | null>(null);

    useEffect(() => {
      const v = videoRef.current;
      if (!v) return;

      const _onPlay = () => {
        setPlaying(true);
        onPlayStateChange?.(true);
      };
      const _onPause = () => {
        setPlaying(false);
        onPlayStateChange?.(false);
      };
      const _onTime = () => {
        const c = v.currentTime || 0;
        const d = v.duration || 0;
        setCurrent(c);
        setBuffered(bufferedEnd(v));
        onTimeUpdateSec?.(c, d);
      };
      const _onLoaded = () => setDuration(v.duration || 0);
      const _onProg = () => setBuffered(bufferedEnd(v));
      const _onMuted = () => {
        setMuted(v.muted);
        onMuteChange?.(v.muted);
      };

      v.addEventListener("play", _onPlay);
      v.addEventListener("pause", _onPause);
      v.addEventListener("timeupdate", _onTime);
      v.addEventListener("loadedmetadata", _onLoaded);
      v.addEventListener("progress", _onProg);
      v.addEventListener("volumechange", _onMuted);

      return () => {
        v.removeEventListener("play", _onPlay);
        v.removeEventListener("pause", _onPause);
        v.removeEventListener("timeupdate", _onTime);
        v.removeEventListener("loadedmetadata", _onLoaded);
        v.removeEventListener("progress", _onProg);
        v.removeEventListener("volumechange", _onMuted);
      };
    }, [onMuteChange, onPlayStateChange, onTimeUpdateSec]);

    // src 변경 시 자동 재생 시도
    useEffect(() => {
      const v = videoRef.current;
      if (!v || !autoPlayOnSourceChange) return;
      const playAfter = () => v.play().catch(() => {});
      v.addEventListener("loadeddata", playAfter, { once: true });
      if (v.readyState >= 2) playAfter();
      return () => v.removeEventListener("loadeddata", playAfter);
    }, [src, autoPlayOnSourceChange]);

    const valueNow = scrub ?? current;
    const bufferedPct = useMemo(
      () => (duration ? Math.min(100, (buffered / duration) * 100) : 0),
      [buffered, duration],
    );

    const railBase = railVariant === "dark" ? "#1f1f1f" : "#9ea0a3";
    const unbuffered = railVariant === "dark" ? "#1f1f1f" : "#bfc3c7";
    const bufferedColor = railVariant === "dark" ? "#2b2b2b" : "#9ea0a3";

    // ===== 뷰포트 핏 계산 (핵심) =====
    const ratioNum = parseAspectRatioToNumber(aspectRatio);
    const maxH = `calc(100dvh - ${viewportOffsetPx}px)`; // 모바일도 안전한 100dvh 사용
    const maxWFromHeight = `calc(${maxH} * ${ratioNum})`;
    const aspectCss =
      typeof aspectRatio === "number" ? aspectRatio : (aspectRatio ?? "16 / 9");

    return (
      <Stack spacing={1} sx={{ width: "100%", color: "common.white" }}>
        {/* 비디오 영역 */}
        {showVideo !== false && (
          <Box
            // width를 "min(100%, 뷰포트로부터 허용되는 최대폭)"으로 제한
            sx={{
              width: fitViewport ? `min(100%, ${maxWFromHeight})` : "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "black",
                aspectRatio: aspectCss, // 16:9 유지
              }}
            >
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                preload={preload}
                playsInline
                crossOrigin={"anonymous"}
                onEnded={(e) => {
                  onEnded?.(e); // 부모에 알림 (예: next 호출)
                  setPlaying(false); // 내부 상태 정리(선택)
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
                {...rest}
              />
            </Box>
          </Box>
        )}

        {/* 컨트롤 바 (재생/음소거/시간/커스텀 슬라이더) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
            "&:hover": {
              background:
                "linear-gradient(to bottom, #00000000 0%, #000000C2 100%)",
            },
          }}
        >
          <IconButton
            onClick={() =>
              videoRef.current?.paused
                ? videoRef.current.play()
                : videoRef.current?.pause()
            }
            aria-label={playing ? "일시정지" : "재생"}
            sx={{ color: "common.white" }}
          >
            {playing ? <PauseRounded /> : <PlayArrowRounded />}
          </IconButton>

          <IconButton
            onClick={() => {
              if (!videoRef.current) return;
              videoRef.current.muted = !videoRef.current.muted;
            }}
            aria-label={muted ? "음소거 해제" : "음소거"}
            sx={{ color: "common.white" }}
          >
            {muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
          </IconButton>

          <Typography variant={"body2"} sx={{ minWidth: 90 }}>
            {formatTime(valueNow)}
            {" / "}
            {formatTime(duration)}
          </Typography>

          <Slider
            aria-label={"재생 위치"}
            value={Number.isFinite(valueNow) ? valueNow : 0}
            min={0}
            max={Number.isFinite(duration) && duration > 0 ? duration : 0}
            step={1}
            onChange={(_, val) => setScrub(val as number)}
            onChangeCommitted={(_, val) => {
              const v = videoRef.current;
              if (!v) return;
              const next = val as number;
              v.currentTime = next;
              setScrub(null);
            }}
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
        </Box>
      </Stack>
    );
  },
);

export default MinimalVideoPlayer;
