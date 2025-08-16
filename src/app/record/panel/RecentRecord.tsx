"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

// 응답 타입(필요 필드만)
type RecordItem = {
  recordId: number;
  startTime: string; // ISO
  endTime: string;   // ISO
  participantCount: number;
  durationKind: string;
  singingKind: string;
  cognitiveKind: string;
  routineKind: string;
};
type RecordAPI = {
  status: number;
  message: string;
  data: RecordItem[];
};

function formatRange(startISO?: string, endISO?: string) {
  if (!startISO || !endISO) return "";
  const s = new Date(startISO);
  const e = new Date(endISO);

  // 예: 2025년 07월 07일 13:00~14:01
  const date = s.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const st = s.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  const et = e.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  return `${date} ${st}~${et}`;
}

export default function RecentRecord() {
  const router = useRouter();

  const [latest, setLatest] = useState<RecordItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1) 최근 기록 가져오기
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/record`, {
          cache: "no-store",
        });
        if (res.ok) {
          const json = (await res.json()) as RecordAPI;
          const first = json?.data?.[0] ?? null;
          if (mounted) setLatest(first);
        }
      } catch {
        // 무시: latest는 null 유지
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 2) 카드 클릭 핸들러
  const handleClickCard = () => {
    // “최근 수업이 작성되어 있다면” → 팝업 노출
    // (기준: /record 응답 배열에 첫 요소가 존재하면 '최근 기록이 있음'으로 간주)
    if (latest) {
      setOpenDialog(true);
      return;
    }
    // 없으면 새 작성 페이지로 즉시 이동
    router.push("/record/new");
  };

  const dateRangeText = useMemo(
    () => formatRange(latest?.startTime, latest?.endTime),
    [latest]
  );

  const descText = useMemo(() => {
    if (!latest) return "";
    // 필요한 key들 간단 연결(추후 매핑표 오면 한글 문구로 변환 가능)
    // 예시: "맞춤형 루틴 : 60분 / 태권도+태권체조 포함 / 튜닝밴드 / 등"
    const parts = [
      `duration: ${latest.durationKind}`,
      `routine: ${latest.routineKind}`,
      `cognitive: ${latest.cognitiveKind}`,
      `singing: ${latest.singingKind}`,
    ];
    return parts.join(" / ");
  }, [latest]);

  return (
    <>
      <Card
        variant="outlined"
        onClick={handleClickCard}
        sx={{
          bgcolor: (t) => t.palette.grey[100],
          cursor: "pointer",
          "&:hover": { bgcolor: (t) => t.palette.grey[200] },
        }}
      >
        {/* 헤더 + 콘텐츠를 가로(space-between) 배치 */}
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* 좌측: 타이틀 */}
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="h6" fontWeight={700}>
              최근 수업 작성하기 →
            </Typography>
          </Box>

          {/* 우측: 최근 기록 요약(로딩 전엔 자리만 유지) */}
          <Box sx={{ flex: 2, overflow: "hidden" }}>
            <Stack spacing={0.5} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {loading ? "불러오는 중..." : dateRangeText || "최근 수업이 없습니다"}
              </Typography>
              {!!latest && (
                <>
                  <Typography variant="body2" noWrap>
                    참여인원 {latest.participantCount}명
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {descText}
                  </Typography>
                </>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* 이미 작성된 경우 표시하는 팝업 */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} max-width="xs" fullWidth>
        <DialogTitle sx={{ pb: 1.5 }}>이미 기록을 작성했습니다.</DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            최근 수업이 이미 등록되어 있습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            취소
          </Button>
          <Button
            variant="contained"
            component={Link}
            href={latest ? `/record/${latest.recordId}` : "/record"}
          >
            작성한 기록 보기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
