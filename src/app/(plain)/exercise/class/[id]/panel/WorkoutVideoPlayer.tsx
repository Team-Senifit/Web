"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import VideoPlayer, { IVideoHandle } from "@/components/VideoPlayer";
import useMedia from "@/hooks/useMedia";
import Header from "./Header";
import { useParams, useRouter } from "next/navigation";
import { useTimer } from "@/hooks/useTimer";
import { axiosClient } from "@/apis/axiosClient";
import { isAuthError } from "@/apis/errors";
// import { useToastStore } from "@/states/useToastStore";
import SenifitDialog from "@/components/SenifitDialog";

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
  const router = useRouter();

  const { seconds } = useTimer();

  const { id } = useParams();
  const recordId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id]);

  const notifyDone = useCallback((): void => {
    if (!recordId) return;
    shouldBypassUnload.current = true;
    // 단일 탭 흐름: 종료 시 완료 화면으로 이동
    router.replace(`/exercise/done/${recordId}?seconds=${seconds}`);
  }, [recordId, router, seconds]);

  useEffect(() => {
    if (!recordId) return;

    let cancelled = false;
    let timeoutId: number | null = null;
    let inFlight = false;
    let redirected = false;

    const pulse = async () => {
      if (cancelled || inFlight) return;
      inFlight = true;
      try {
        await axiosClient.put(`/records/${recordId}`);
      } catch (err) {
        // axios interceptor에서 401/403 -> AuthError로 throw 되지만
        // 여기서 catch로 삼키면 전역 error boundary 리디렉션이 동작하지 않음.
        // heartbeat에서는 즉시 로그인으로 전환한다.
        if (!redirected && isAuthError(err)) {
          redirected = true;
          cancelled = true;
          if (timeoutId != null) window.clearTimeout(timeoutId);
          const currentPath = window.location.pathname + window.location.search;
          const loginUrl = `/login?next=${encodeURIComponent(currentPath)}`;
          window.location.href = loginUrl;
          return;
        }
        console.error("Heartbeat failed:", err);
      } finally {
        inFlight = false;
      }
    };

    const scheduleNext = (delayMs: number) => {
      if (cancelled) return;
      timeoutId = window.setTimeout(async () => {
        await pulse();
        scheduleNext(30000);
      }, delayMs);
    };

    // 운동 시작 시 즉시 첫 하트비트 전송 + 이후 30초 루프
    void pulse();
    scheduleNext(30000);

    // 백그라운드 타이머 throttling 대비: 다시 포커스/표시되면 즉시 1회 전송
    const onVisible = () => {
      if (document.visibilityState === "visible") void pulse();
    };
    window.addEventListener("focus", onVisible);
    window.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onVisible);

    // 페이지가 닫히거나 전환될 때 마지막 1회 시도(keepalive)
    const onPageHide = () => {
      try {
        void fetch(`/api/records/${recordId}`, {
          method: "PUT",
          credentials: "include",
          keepalive: true,
        });
      } catch {
        // ignore
      }
    };
    window.addEventListener("pagehide", onPageHide);

    return () => {
      cancelled = true;
      if (timeoutId != null) window.clearTimeout(timeoutId);
      window.removeEventListener("focus", onVisible);
      window.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onVisible);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [recordId]);

  // 이탈 방지 bypass 플래그 (앱 내부 이동 시 사용)
  const shouldBypassUnload = useRef(false);

  // 이탈 방지 로직 (브라우저 종료/새로고침)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBypassUnload.current) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // 이탈 방지 로직 (뒤로 가기)
  useEffect(() => {
    // 현재 상태를 push하여 뒤로 가기 시 popstate가 트리거되게 함
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // 뒤로 가기 버튼을 눌렀을 때 다이얼로그를 띄움
      setOpenExitDialog(true);
      // 다시 pushState를 해서 현재 페이지를 유지 (사용자가 '나가기'를 누를 때까지)
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const initialIndex = useMemo(() => {
    if (initialId == null) return 0;
    const i = videos.findIndex((v) => v.id === initialId);
    return i >= 0 ? i : 0;
  }, [videos, initialId]);

  const [index, setIndex] = useState<number>(initialIndex);
  const [openExitDialog, setOpenExitDialog] = useState(false);
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
        if (!loop) {
          // 마지막 영상까지 끝나면 자동으로 완료 처리
          notifyDone();
          return;
        }
        target = 0;
      } else if (next < 0) {
        target = 0;
      }

      setIndex(target);
      onIndexChange?.(target, videos[target]);
    },
    [videos, loop, onIndexChange, notifyDone],
  );
  // const { setToastOpen } = useToastStore();

  const prev = useCallback(() => {
    // setToastOpen({ message: "이전 영상을 재생합니다.", autoHide: "short" });
    go(index - 1);
  }, [go, index]);

  const next = useCallback(() => {
    const isLast = index === videos.length - 1;
    if (isLast && !loop) {
      notifyDone();
      return;
    }
    // setToastOpen({ message: "다음 영상을 재생합니다.", autoHide: "short" });
    go(index + 1);
  }, [go, index, loop, notifyDone, videos.length]);

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
          onEnded={next} // 한 영상 끝나면 다음으로(마지막이면 자동 종료는 go()에서 처리)
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

      {/* 이탈 확인 다이얼로그 */}
      <SenifitDialog
        isOpen={openExitDialog}
        onClose={() => setOpenExitDialog(false)}
        dialogType={"error"}
        title={"사이트에서 나가시겠습니까?"}
        body={"변경사항이 저장되지 않을 수 있습니다"}
        primaryText={"나가기"}
        onPrimaryClick={() => {
          shouldBypassUnload.current = true;
          notifyDone();
        }}
        secondaryText={"취소"}
        onSecondaryClick={() => setOpenExitDialog(false)}
      />
    </Box>
  );
}
