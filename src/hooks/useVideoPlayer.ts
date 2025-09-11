import { useToastStore } from "@/states/useToastStore";
import { useEffect, useState, useCallback } from "react";

const bufferedEnd = (v: HTMLVideoElement) => {
  const { buffered, currentTime } = v;
  for (let i = buffered.length - 1; i >= 0; i--) {
    if (currentTime >= buffered.start(i) && currentTime <= buffered.end(i))
      return buffered.end(i);
  }
  return buffered.length ? buffered.end(buffered.length - 1) : 0;
};

export function useVideoPlayer(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  opts: {
    src?: string;
    autoPlayOnSourceChange?: boolean;
    onPlayStateChange?: (p: boolean) => void;
    onMuteChange?: (m: boolean) => void;
    onTimeUpdateSec?: (c: number, d: number) => void;
  } = {},
) {
  const {
    src,
    autoPlayOnSourceChange,
    onPlayStateChange,
    onMuteChange,
    onTimeUpdateSec,
  } = opts;

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [scrub, setScrub] = useState<number | null>(null);

  const { setToastOpen } = useToastStore();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => {
      setPlaying(true);
      onPlayStateChange?.(true);
    };
    const onPause = () => {
      setPlaying(false);
      setToastOpen({ message: "영상을 정지했습니다." });
      onPlayStateChange?.(false);
    };
    const onTime = () => {
      const c = v.currentTime || 0;
      const d = v.duration || 0;
      setCurrent(c);
      setBuffered(bufferedEnd(v));
      onTimeUpdateSec?.(c, d);
    };
    const onLoaded = () => setDuration(v.duration || 0);
    const onProg = () => setBuffered(bufferedEnd(v));
    const onVol = () => {
      setMuted(v.muted);
      onMuteChange?.(v.muted);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("progress", onProg);
    v.addEventListener("volumechange", onVol);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("progress", onProg);
      v.removeEventListener("volumechange", onVol);
    };
  }, [videoRef, onPlayStateChange, onMuteChange, onTimeUpdateSec]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !autoPlayOnSourceChange) return;
    const playAfter = () => v.play().catch(() => {});
    v.addEventListener("loadeddata", playAfter, { once: true });
    if (v.readyState >= 2) playAfter();
    return () => v.removeEventListener("loadeddata", playAfter);
  }, [videoRef, src, autoPlayOnSourceChange]);

  const play = useCallback(async () => videoRef.current?.play(), [videoRef]);
  const pause = useCallback(() => videoRef.current?.pause(), [videoRef]);
  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }, [videoRef]);
  const mute = useCallback(
    (m?: boolean) => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = typeof m === "boolean" ? m : !v.muted;
      setMuted(v.muted);
      onMuteChange?.(v.muted);
    },
    [videoRef, onMuteChange],
  );

  const seek = useCallback(
    (time: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.currentTime = Math.max(0, Math.min(time, v.duration || time));
    },
    [videoRef],
  );

  return {
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
  } as const;
}

export default useVideoPlayer;
