"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import VideoPlayer, { IVideoHandle } from "@/components/VideoPlayer";
import useMedia from "@/hooks/useMedia";
import Header from "./Header";
import { useParams } from "next/navigation";
import { useTimer } from "@/hooks/useTimer";
import { notifyClassDone } from "@/utils/broadcast";
import { axiosClient } from "@/apis/axiosClient";

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

/** DOM 요소의 실시간 높이를 구하는 훅 */
function useElementHeight(ref: React.RefObject<HTMLElement | null>) {
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setH(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    setH(el.getBoundingClientRect().height);
    return () => ro.disconnect();
  }, [ref]);
  return h;
}

const toAbsUrl = (path: string, base?: string) => {
  if (!path) return path;
  try {
    return new URL(path, base).toString();
  } catch {
    return path;
  }
};

export default function WorkoutVideoPlaylist({
  videos,
  initialId,
  loop = false,
  assetBaseUrl,
  onIndexChange,
  duration,
}: IWorkoutVideoPlaylistProps) {
  const { isPhone } = useMedia();

  const { seconds } = useTimer();

  const { id } = useParams();
  const programId = id; // 기존 코드 호환성을 위해 유지

  const notifyDone = (): void => {
    const pid = Array.isArray(programId) ? programId[0] : programId;
    notifyClassDone({ programId: pid, seconds });
    window.close();
  };

  useEffect(() => {
    const recordId = Array.isArray(id) ? id[0] : id;
    if (!recordId) return;

    // 30초마다 finishedAt 업데이트를 위한 하트비트
    const interval = setInterval(() => {
      axiosClient.put(`/records/${recordId}`).catch((err) => {
        console.error("Heartbeat failed:", err);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [id]);

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
        target = 0;
      }

      setIndex(target);
      onIndexChange?.(target, videos[target]);
    },
    [videos, loop, onIndexChange],
  );

  const prev = useCallback(() => {
    go(index - 1);
  }, [go, index]);

  const next = useCallback(() => {
    go(index + 1);
  }, [go, index]);

  // src 바뀌면 자동 재생 시도(사용자 제스처 이후 연속 재생 안정화)
  useEffect(() => {
    handleRef.current?.play().catch(() => {});
  }, [src]);

  // ====== 동적 높이 측정 ======
  const headerWrapRef = useRef<HTMLElement>(null);
  const footerWrapRef = useRef<HTMLElement>(null);
  const headerH = useElementHeight(headerWrapRef);
  const footerH = useElementHeight(footerWrapRef);
  const viewportOffsetPx = headerH + footerH;

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      {/* 고정 헤더(동적 측정용 래퍼) */}
      <Box
        component={"header"}
        ref={headerWrapRef}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
        }}
      >
        <Header
          duration={duration}
          isEnd={index === videos.length - 1}
          onEnd={notifyDone}
          seconds={seconds}
        />
      </Box>

      {/* 본문: 헤더/푸터만큼 패딩을 줘서 겹침 방지 + 가운데 정렬 */}
      <Stack
        component={"main"}
        sx={{
          pt: `${headerH}px`,
          pb: `${footerH}px`,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          bgcolor: "black",
        }}
      >
        {/* 커스텀 슬라이더 포함된 비디오(내부) */}
        <VideoPlayer
          ref={handleRef}
          src={src}
          length={videos[index].duration}
          poster={poster}
          barColor={"#FF7A00"}
          aspectRatio={"16 / 9"}
          fitViewport
          viewportOffsetPx={viewportOffsetPx} // ← 헤더+푸터를 고려해서 남은 영역만 차지
          onEnded={next} // 한 영상 끝나면 다음으로
          // onTimeUpdateSec={(cur, dur) => { /* 필요 시 진행률 상태 외부에 전달 */ }}
        />
      </Stack>

      {/* 고정 푸터(동적 측정용 래퍼) */}
      <Stack
        component={"footer"}
        ref={footerWrapRef}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={3}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          bgcolor: "background.paper",
          boxShadow: 1,
          px: [2, 6],
          py: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          width: "100%",
        }}
      >
        {!isPhone && (
          <Typography variant={"Heading1"}>{current.name}</Typography>
        )}

        <Stack
          direction={"row"}
          spacing={3}
          justifyContent={"flex-end"}
          width={["100%", "unset"]}
        >
          <Button
            sx={{
              flex: [1, "unset"],
              borderRadius: "0.75rem",
              py: 2,
              px: [0, 4, 8],
              bgcolor: "fillVariants.colored",
              "& .Mui-disabled": { color: "primaryVariants.disabled" },
            }}
            onClick={prev}
            disabled={index === 0}
          >
            <Typography variant={"Headline1"}>{"이전"}</Typography>
          </Button>
          <Button
            disableElevation
            variant={"contained"}
            sx={{
              flex: [1, "unset"],
              borderRadius: "0.75rem",
              py: 2,
              px: [0, 4, 8],
            }}
            onClick={videos.length - 1 === index ? notifyDone : next}
          >
            <Typography variant={"Headline1"}>
              {videos.length - 1 === index ? "종료" : "다음"}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
