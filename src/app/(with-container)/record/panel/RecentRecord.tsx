"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { getRecords, RecordItem } from "../utils/recordUtils";
import RecordBrief from "./RecordBrief";

export default function RecentRecord() {
  const router = useRouter();

  const [latest, setLatest] = useState<RecordItem | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getRecords();
      if (mounted) setLatest(data[0] ?? null);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleClickCard = () => {
    if (latest?.surveysExist) {
      setOpenDialog(true);
      return;
    }
    router.push(`/record/detail/${latest?.recordId}`);
  };

  return (
    <>
      <Card
        onClick={handleClickCard}
        sx={{
          display: "flex",
          height: 284,
          p: "36px",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
          borderRadius: "12px",
          background:
            "linear-gradient(98deg, #FFFDFA 50.89%, #FFE3C2 100.93%, #FEDDCC 118.86%)",
          boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
          cursor: "pointer",
        }}
      >
        <CardContent
          sx={{
            p: 0,
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography variant={"Title1"}>{"최근 수업 기록하기"}</Typography>

          {latest ? (
            <RecordBrief record={latest} />
          ) : (
            <Typography
              variant={"Heading1"}
              sx={{
                color:
                  "var(--Sementic-Color-Label-color-label-neutral, var(--Label-neutral, #646568))",
              }}
            >
              {"아직 진행한 수업이 없어요"}
            </Typography>
          )}
        </CardContent>

        {/* 오른쪽 이미지 임시 */}
        <Box
          sx={{
            flexShrink: 0,
            width: 240,
            height: 212,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Box
            component={"img"}
            src={"https://dummyimage.com/360x240/f8a94c/ffffff&text=IMAGE"}
            alt={"placeholder"}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Card>

      {/* 이미 작성된 경우 팝업 */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        max-Width={"xs"}
        fullWidth
      >
        <DialogTitle sx={{ pb: 1.5 }}>
          {"이미 기록을 작성했습니다."}
        </DialogTitle>
        <DialogContent sx={{ pt: 0 }}>
          <Typography variant={"Body2"} color={"text.secondary"}>
            {"최근 수업이 이미 등록되어 있습니다."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={() => setOpenDialog(false)}>
            {"취소"}
          </Button>
          <Button
            variant={"contained"}
            component={Link}
            href={latest ? `/record/detail/${latest.recordId}` : "/record"}
          >
            {"작성한 기록 보기"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
