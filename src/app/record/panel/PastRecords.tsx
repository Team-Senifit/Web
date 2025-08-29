"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useEffect, useMemo, useState } from "react";
import {
  getRecords,
  RecordItem,
} from "@/app/record/utils/recordUtils";
import RecordBrief from "./RecordBrief";
import RecordButton from "./RecordButton";

export default function PastRecords({ records }: { records?: RecordItem[] }) {
  const [list, setList] = useState<RecordItem[] | null>(records ?? null);
  const [loading, setLoading] = useState(!records);

  // props가 없으면 API 호출
  useEffect(() => {
    if (records) return;
    let mounted = true;
    (async () => {
      const data = await getRecords();
      if (mounted) setList(data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [records]);

  const top3 = useMemo(() => (list ?? []).slice(0, 3), [list]);
  const isEmpty = useMemo(() => !loading && top3.length === 0, [loading, top3]);
  console.log(isEmpty);
  
  return (
    <Card variant="outlined" sx={{ p: 0, borderRadius: "12px" }}>
      <CardContent sx={{ p: 6 /* 48px */ }}>
        {/* 헤더 */}
        <Stack spacing={1}>
          <IconButton aria-label="새로고침" size="small" onClick={async () => {
            setLoading(true);
            const data = await getRecords();
            setList(data);
            setLoading(false);
          }} sx={{ alignSelf: "flex-start" }}>
            <RefreshRoundedIcon fontSize="small" />
          </IconButton>

          <Typography variant="Heading1">지난 수업 보기</Typography>
        </Stack>

        <Divider sx={{ mt: 3 }} />

        {isEmpty ? (
          <Box
            sx={{
              py: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              variant="Heading1"
              sx={{
                color:
                  "var(--Sementic-Color-Label-color-label-alternative, var(--Label-alternative, #97989B))",
              }}
            >
              아직 진행한 수업이 없어요
            </Typography>

            <Button
              component={Link}
              href="/"  // 운동 탭으로 이동하도록 설정
              disableElevation
              sx={{
                display: "flex",
                padding: "16px 64px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "12px",
                background: "var(--Primary-default, #FB5F04)",
              }}
            >
              <Typography variant="Heading1" color="static.white">
                수업 시작하러 가기
              </Typography>
            </Button>
          </Box>
        ) : (
          <>
            <Stack sx={{ mt: 3 }}>
              {top3.map((it, idx) => {
                const cta = it.surveysExist ? "자세히 보기" : "작성하기";
                const href = it.surveysExist
                  ? `/record/detail/${it.recordId}`
                  : `/record/write/${it.recordId}`;

                return (
                  <Box key={it.recordId}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <RecordBrief record={it} />
                      <RecordButton href={href} cta={cta} surveysExist={it.surveysExist} />
                    </Stack>

                    {idx < top3.length - 1 && <Divider sx={{ my: 3 }} />}
                  </Box>
                );
              })}
            </Stack>
          </>
        )}

        <Divider sx={{ mt: 3 }} />

        {/* 하단: 이전 수업 전체보기 */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            component={Link}
            href="/record/past/1"
            disabled={isEmpty}
            disableElevation
            sx={{
              borderRadius: "12px",
              padding: "16px 64px",
              background: isEmpty
                ? "var(--Primary-disabled, #FEDFCD)"
                : "var(--Primary-default, #FB5F04)",
            }}
          >
            <Typography variant="Heading1" color={isEmpty ? undefined : "static.white"}>
              이전 수업 전체보기
            </Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}