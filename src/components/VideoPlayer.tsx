"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { Box, Stack, useMediaQuery, Typography } from "@mui/material";
import { VideoFlash, VideoControls } from "./video-player";
import useVideoPlayer from "@/hooks/useVideoPlayer";

export interface IVideoHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  mute: (m?: boolean) => void;
  seek: (timeSec: number) => void;
  toggleFullscreen: () => void;
  getEl: () => HTMLVideoElement | null;
}

export interface IVideoPlayerProps extends Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "onTimeUpdate"
> {
  src: string;
  length: number;
  poster?: string;
  barColor?: string; // e.g. "warning.main" | "#FF7A00"
  autoPlayOnSourceChange?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
  onMuteChange?: (muted: boolean) => void;
  onTimeUpdateSec?: (current: number, duration: number) => void;

  /** CSS aspect-ratio (기본 16/9). "16 / 9" | "4 / 3" | 1.7778 */
  aspectRatio?: string | number;

  /** 헤더+푸터 등 상하 고정영역 (px) — 부모에서 동적 측정해서 전달 */
  viewportOffsetPx?: number;

  /** 남은 뷰포트 안에서 자동으로 width 제한(기본 true) */
  fitViewport?: boolean;
}

const parseAspectRatioToNumber = (ar?: string | number): number => {
  if (typeof ar === "number" && Number.isFinite(ar)) return ar;
  if (typeof ar === "string") {
    const t = ar.replace(/\s+/g, "");
    const m = t.match(/^(\d+(?:\.\d+)?)[/:](\d+(?:\.\d+)?)$/);
    if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    const n = Number(t);
    if (Number.isFinite(n)) return n;
  }
  return 16 / 9;
};

const VideoPlayer = forwardRef<IVideoHandle, IVideoPlayerProps>(
  function VideoPlayer(
    {
      src,
      length,
      poster,
      barColor = "warning.main",
      preload = "metadata",
      autoPlayOnSourceChange = true,
      onPlayStateChange,
      onMuteChange,
      onTimeUpdateSec,
      onEnded,
      aspectRatio = "16 / 9",
      viewportOffsetPx = 0,
      fitViewport = true,
      ...rest
    },
    ref,
  ) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    // controlsRef removed; controls are separate component

    // 재생/일시정지 플래시 아이콘
    const [flashKind, setFlashKind] = useState<null | "play" | "pause">(null);
    const [flashSeq, setFlashSeq] = useState(0);
    const flashTimerRef = useRef<number | null>(null);

    useEffect(() => {
      return () => {
        if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
      };
    }, []);

    const pulse = (kind: "play" | "pause") => {
      setFlashKind(kind);
      setFlashSeq((s) => s + 1); // 같은 아이콘 연속 클릭 시 애니메이션 다시 트리거
      if (flashTimerRef.current) window.clearTimeout(flashTimerRef.current);
      flashTimerRef.current = window.setTimeout(() => {
        setFlashKind(null);
      }, 650);
    };

    const handleToggleFullscreen = useCallback(() => {
      if (!wrapperRef.current) return;

      if (!document.fullscreenElement) {
        wrapperRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`,
          );
        });
      } else {
        document.exitFullscreen();
      }
    }, []);

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          handleFullscreenChange,
        );
      };
    }, []);

    const {
      playing,
      muted,
      duration,
      current,
      buffered,
      scrub,
      setScrub,
      play,
      pause,
      toggle,
      mute,
      seek,
    } = useVideoPlayer(videoRef, {
      src,
      autoPlayOnSourceChange,
      onPlayStateChange,
      onMuteChange,
      onTimeUpdateSec,
    });

    useImperativeHandle(ref, () => ({
      play: async () => play?.(),
      pause: () => pause?.(),
      toggle: () => toggle?.(),
      mute: (m?: boolean) => mute?.(m),
      seek: (t: number) => seek?.(t),
      toggleFullscreen: handleToggleFullscreen,
      getEl: () => videoRef.current,
    }));

    const valueNow = scrub ?? current;
    const bufferedPct = useMemo(() => {
      return duration ? Math.min(100, (buffered / duration) * 100) : 0;
    }, [buffered, duration]);

    const railBase = "#9ea0a3";
    const unbuffered = "#bfc3c7";
    const bufferedColor = "#9ea0a3";

    const [controlsVisible, setControlsVisible] = useState(false);
    const hideTimerRef = useRef<number | null>(null);

    // 터치/코스 포인터 환경 판별 (모바일 등)
    const isTouch = useMediaQuery("(hover: none), (pointer: coarse)");

    // 스크럽 중 여부
    const isScrubbing = scrub !== null;

    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const showControls = useCallback(
      (autoHideMs = 2200) => {
        setControlsVisible(true);
        clearHideTimer();
        if (playing && !isTouch && !isScrubbing) {
          hideTimerRef.current = window.setTimeout(() => {
            setControlsVisible(false);
            hideTimerRef.current = null;
          }, autoHideMs);
        }
      },
      [playing, isTouch, isScrubbing],
    );

    const hideControls = useCallback(() => {
      clearHideTimer();
      setControlsVisible(false);
    }, []);

    // 터치 환경에선 기본적으로 항상 보이게
    useEffect(() => {
      if (isTouch) setControlsVisible(true);
    }, [isTouch]);

    // 재생/일시정지 전환 시 정책
    useEffect(() => {
      if (!playing) {
        setControlsVisible(true);
        clearHideTimer();
      } else {
        showControls();
      }
    }, [playing, showControls]);

    // ===== 핵심: 컨트롤 높이까지 뺀 남은 세로로 16:9 최대폭 계산 =====
    const ratioNum = parseAspectRatioToNumber(aspectRatio);
    const aspectCss =
      typeof aspectRatio === "number" ? aspectRatio : (aspectRatio ?? "16 / 9");
    const maxWFromHeightExpr = `calc((100dvh - ${isFullscreen ? 0 : viewportOffsetPx}px) * ${ratioNum})`;
    return (
      <Stack
        spacing={isFullscreen ? 0 : 1}
        sx={{
          width: "100%",
          height: isFullscreen ? "100%" : "auto",
          color: "common.white",
        }}
      >
        {/* 비디오 영역: 남은 높이를 꽉 채우되 16:9 유지 */}
        <Box
          ref={wrapperRef}
          sx={{
            width:
              fitViewport && !isFullscreen
                ? `min(100%, ${maxWFromHeightExpr})`
                : "100%",
            height: isFullscreen ? "100dvh" : "auto",
            mx: "auto",
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "black",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: isFullscreen ? "auto" : "100%",
              maxHeight: isFullscreen ? "100dvh" : "unset",
              overflow: "hidden",
              bgcolor: "black",
              aspectRatio: isFullscreen ? "unset" : aspectCss,
            }}
            onPointerEnter={() => showControls()}
            onPointerMove={() => showControls()}
            onPointerLeave={() => hideControls()}
            onFocusCapture={() => showControls(3000)}
            onBlurCapture={() => hideControls()}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              preload={preload}
              playsInline
              crossOrigin={"anonymous"}
              onEnded={(e) => {
                onEnded?.(e);
                pause?.();
              }}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                if (v.paused) {
                  v.play();
                  pulse("play");
                } else {
                  v.pause();
                  pulse("pause");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === " " || e.key.toLowerCase() === "k") {
                  e.preventDefault();
                  if (videoRef.current?.paused) {
                    videoRef.current?.play();
                  } else {
                    videoRef.current?.pause();
                  }
                  showControls();
                }
                if (e.key.toLowerCase() === "m") {
                  if (!videoRef.current) return;
                  videoRef.current.muted = !videoRef.current.muted;
                  showControls();
                }
                if (e.key === "ArrowLeft") {
                  if (!videoRef.current) return;
                  videoRef.current.currentTime = Math.max(
                    0,
                    videoRef.current.currentTime - 5,
                  );
                  showControls();
                }
                if (e.key === "ArrowRight") {
                  if (!videoRef.current) return;
                  videoRef.current.currentTime = Math.min(
                    videoRef.current.duration || Infinity,
                    (videoRef.current.currentTime || 0) + 5,
                  );
                  showControls();
                }
              }}
              {...rest}
            />
            <VideoFlash kind={flashKind} seq={flashSeq} />

            <VideoControls
              playing={playing}
              length={length}
              muted={muted}
              valueNow={valueNow}
              duration={duration}
              bufferedPct={bufferedPct}
              railBase={railBase}
              unbuffered={unbuffered}
              bufferedColor={bufferedColor}
              barColor={barColor}
              onTogglePlay={() => {
                const v = videoRef.current;
                if (!v) return;
                if (v.paused) {
                  v.play();
                  pulse("play");
                } else {
                  v.pause();
                  pulse("pause");
                }
              }}
              onToggleMute={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = !v.muted;
              }}
              setScrub={setScrub}
              onSeek={(next) => {
                const v = videoRef.current;
                if (!v) return;
                v.currentTime = next;
                setScrub(null);
              }}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              visible={controlsVisible}
            />

            {/* Unmute overlay for autoplay-muted start */}
            {muted && playing && (
              <Box
                onClick={() => {
                  mute(false);
                  showControls();
                }}
                role={"button"}
                tabIndex={0}
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "auto",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(0,0,0,0.5)",
                    color: "common.white",
                    px: 2,
                    py: 1,
                    borderRadius: "999px",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant={"button"}>{"소리 켜기"}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
    );
  },
);

export default VideoPlayer;
