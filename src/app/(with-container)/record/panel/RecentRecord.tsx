"use client";

import { useEffect, useState } from "react";
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
import {
  getRecords,
  dateString,
  participantString,
  exerciseString,
  RecordItem,
} from "../utils/recordUtils";

export default function RecentRecord() {
  const router = useRouter();

  const [latest, setLatest] = useState<RecordItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 최근 기록 가져오기
  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getRecords();
      if (mounted) setLatest(data[0] ?? null);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // 🔹 카드 클릭: 설문 존재 여부 확인
  const handleClickCard = () => {
    if (latest?.surveysExist) {
      setOpenDialog(true);
      return;
    }
    router.push("/record/new");
  };

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
        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="h6" fontWeight={700}>
              최근 수업 작성하기 →
            </Typography>
          </Box>

          <Box sx={{ flex: 2, overflow: "hidden" }}>
            <Stack
              spacing={0.5}
              sx={{ textAlign: { xs: "left", md: "right" } }}
            >
              <Typography variant="subtitle1" fontWeight={600} noWrap>
                {loading
                  ? "불러오는 중..."
                  : latest
                    ? dateString(latest.startTime, latest.endTime)
                    : "최근 수업이 없습니다"}
              </Typography>

              {!!latest && (
                <>
                  <Typography variant="body2" noWrap>
                    참여인원 : {participantString(latest)}명
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    맞춤형 루틴 : {exerciseString(latest)}
                  </Typography>
                </>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* 🔹 이미 작성된 경우 팝업 */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        max-width="xs"
        fullWidth
      >
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
