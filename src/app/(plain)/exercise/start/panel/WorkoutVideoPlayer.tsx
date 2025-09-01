"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import VideoPlayer, { IVideoHandle } from "@/components/VideoPlayer";
import useMedia from "@/hooks/useMedia";
import Header from "./Header";

export interface IWorkoutVideo {
  id: number;
  kind_code: string;
  name: string;
  description: string;
  script: string;
  duration: number;
  video_path: string;
  thumbnail_path: string;
}

export interface IWorkoutVideoPlaylistProps {
  videos: IWorkoutVideo[];
  /** 기본 재생 시작 id (없으면 0번째) */
  initialId?: number;
  /** 리스트 끝에서 처음으로 순환할지 */
  loop?: boolean;
  /** 상대 경로일 때 붙일 베이스 URL (예: https://cdn.example.com/) */
  assetBaseUrl?: string;
  /** 인덱스 변경 콜백(옵션) */
  onIndexChange?: (index: number, video: IWorkoutVideo) => void;
  duration: number;
}

const toAbsUrl = (path: string, base?: string) => {
  if (!path) return path;
  try {
    // 절대면 그대로, 상대면 base 붙이기
    return new URL(path, base).toString();
  } catch {
    return path;
  }
};

// const fmt = (sec?: number) => {
//   if (!sec || !Number.isFinite(sec)) return "0:00";
//   const m = Math.floor(sec / 60);
//   const s = Math.floor(sec % 60);
//   return `${m}:${String(s).padStart(2, "0")}`;
// };

export default function WorkoutVideoPlaylist({
  videos,
  initialId,
  loop = true,
  assetBaseUrl,
  onIndexChange,
  duration,
}: IWorkoutVideoPlaylistProps) {
  const { isPhone } = useMedia();

  const initialIndex = useMemo(() => {
    if (initialId == null) return 0;
    const i = videos.findIndex((v) => v.id === initialId);
    return i >= 0 ? i : 0;
  }, [videos, initialId]);

  const [index, setIndex] = useState<number>(initialIndex);
  const handleRef = useRef<IVideoHandle>(null);

  const current = videos[index];

  const src = useMemo(
    () => toAbsUrl(current.video_path, assetBaseUrl),
    [current.video_path, assetBaseUrl],
  );
  const poster = useMemo(
    () => toAbsUrl(current.thumbnail_path, assetBaseUrl),
    [current.thumbnail_path, assetBaseUrl],
  );

  const go = useCallback(
    (next: number) => {
      const len = videos.length;
      let target = next;

      if (next >= len) {
        if (!loop) return; // 마지막에서 멈춤
        target = 0;
      } else if (next < 0) {
        target = loop ? len - 1 : 0;
      }

      setIndex(target);
      onIndexChange?.(target, videos[target]);
    },
    [videos, loop, onIndexChange],
  );

  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  // src 바뀌면 자동 재생 시도(사용자 제스처 이후 연속 재생 안정화)
  useEffect(() => {
    handleRef.current?.play().catch(() => {});
  }, [src]);

  return (
    <Stack>
      <Header duration={duration} />

      {/* 커스텀 슬라이더 포함된 비디오(내부) */}
      <VideoPlayer
        ref={handleRef}
        src={src}
        poster={poster}
        railVariant={"light"}
        barColor={"#FF7A00"}
        onEnded={next} // 한 영상 끝나면 다음으로
        // onTimeUpdateSec={(cur, dur) => { /* 필요 시 진행률 상태 외부에 전달 */ }}
      />
      <Stack
        direction={"column"}
        spacing={3}
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          pt: [undefined, 3],
          px: [undefined, 6],
          pb: [undefined, 4],
          p: 3,
          display: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {!isPhone && (
          <>
            <Stack direction={"column"} spacing={1}>
              <Typography variant={"Title2"}>{current.name}</Typography>
              <Typography variant={"Heading1"}>
                {current.description}
              </Typography>
            </Stack>
            <Divider sx={{ borderColor: "border.normal" }} />
          </>
        )}

        <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
          <Button
            sx={{
              flex: [1, "unset"],
              borderRadius: "0.75rem",
              py: 2,
              px: [0, 8],
              bgcolor: "fillVariants.colored",
            }}
            onClick={prev}
          >
            <Typography variant={"Heading1"}>{"이전"}</Typography>
          </Button>
          <Button
            variant={"contained"}
            sx={{
              flex: [1, "unset"],
              borderRadius: "0.75rem",
              py: 2,
              px: [0, 8],
            }}
            onClick={next}
          >
            <Typography variant={"Heading1"}>{"다음"}</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
