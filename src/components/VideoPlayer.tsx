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
import {
  Box,
  IconButton,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRounded from "@mui/icons-material/VolumeOffRounded";
import { keyframes } from "@mui/system";

export interface IVideoHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  mute: (m?: boolean) => void;
  seek: (timeSec: number) => void;
  getEl: () => HTMLVideoElement | null;
}

export interface IVideoPlayerProps
  extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "onTimeUpdate"> {
  src: string;
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
  return 16 / 9;
};

// /** margin 포함 바깥높이 측정 */
// const useOuterHeight = (ref: React.RefObject<HTMLElement>) => {
//   const [h, setH] = useState(0);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const compute = () => {
//       const rect = el.getBoundingClientRect();
//       const styles = window.getComputedStyle(el);
//       const mt = parseFloat(styles.marginTop || "0") || 0;
//       const mb = parseFloat(styles.marginBottom || "0") || 0;
//       setH(rect.height + mt + mb);
//     };

//     const ro = new ResizeObserver(compute);
//     ro.observe(el);
//     compute();

//     // margin 변경은 ResizeObserver로 안 잡힐 수 있으니, 폰트/윈도우 리사이즈에 보정
//     window.addEventListener("resize", compute);
//     return () => {
//       ro.disconnect();
//       window.removeEventListener("resize", compute);
//     };
//   }, [ref]);
//   return h;
// };

const VideoPlayer = forwardRef<IVideoHandle, IVideoPlayerProps>(
  function VideoPlayer(
    {
      src,
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
    const controlsRef = useRef<HTMLDivElement>(null);

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
      // (선택) 클릭했으니 컨트롤도 잠깐 보여주고 자동 숨김
      // showControls?.();  // 네가 showControls() 구현해뒀다면 활성화
    };

    // 아이콘 펄스 애니메이션
    const pulseKF = keyframes`
  0%   { opacity: 0; transform: scale(.92); }
  20%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.15); }
`;

    useImperativeHandle(ref, () => ({
      play: async () =>
        videoRef.current ? videoRef.current.play() : Promise.resolve(),
      pause: () => {
        videoRef.current?.pause();
      },
      toggle: () => {
        const v = videoRef.current;
        if (!v) return;
        else if (v.paused) {
          v.play();
        } else {
          v.pause();
        }
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
        console.log("showControls");
        setControlsVisible(true);
        clearHideTimer();
        // 재생 중이고, 터치 환경이 아니고, 스크럽 중이 아닐 때만 자동 숨김
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
        // 일시정지면 항상 보이게 유지
        setControlsVisible(true);
        clearHideTimer();
      } else {
        // 재생 시작 시 한 번 보여주고 자동 숨김 타이머 시작
        showControls();
      }
    }, [playing, showControls]);

    // ===== 핵심: 컨트롤 높이까지 뺀 남은 세로로 16:9 최대폭 계산 =====
    const ratioNum = parseAspectRatioToNumber(aspectRatio);
    const aspectCss =
      typeof aspectRatio === "number" ? aspectRatio : (aspectRatio ?? "16 / 9");
    const maxWFromHeightExpr = `calc((100dvh - ${viewportOffsetPx}px) * ${ratioNum})`;
    return (
      <Stack spacing={1} sx={{ width: "100%", color: "common.white" }}>
        {/* 비디오 영역: 남은 높이를 꽉 채우되 16:9 유지 */}
        <Box
          sx={{
            width: fitViewport ? `min(100%, ${maxWFromHeightExpr})` : "100%",
            mx: "auto",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              bgcolor: "black",
              aspectRatio: aspectCss,
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
                setPlaying(false);
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
            {flashKind && (
              <Box
                key={flashSeq} // 매번 리마운트해서 애니메이션 재시작
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  pointerEvents: "none", // 클릭 통과
                  zIndex: 2, // 비디오 위
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
                  {flashKind === "play" ? (
                    <PlayArrowRounded
                      sx={{ fontSize: 72, color: "common.white" }}
                    />
                  ) : (
                    <PauseRounded
                      sx={{ fontSize: 72, color: "common.white" }}
                    />
                  )}
                </Box>
              </Box>
            )}

            {/* 컨트롤 바 (마진 포함 바깥높이 측정을 위해 ref 부착) */}
            <Box
              onClick={(e) => e.stopPropagation()}
              ref={controlsRef}
              sx={{
                zIndex: 200,
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0, // ⬅️ 비디오 하단에 딱 붙음
                p: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                background: controlsVisible
                  ? "linear-gradient(to bottom, #0000 0%, #000C 100%)"
                  : "transparent",
                opacity: controlsVisible ? 1 : 0,
                pointerEvents: controlsVisible ? "auto" : "none",
                transition: "opacity .18s ease",
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
          </Box>
        </Box>
      </Stack>
    );
  },
);

export default VideoPlayer;
