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
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  getRecords,
  dateString,
  participantString,
  exerciseString,
  RecordItem,
} from "@/app/record/utils/recordUtils";

export default function PastRecords({ records }: { records?: RecordItem[] }) {
  const [list, setList] = useState<RecordItem[] | null>(records ?? null);
  const [loading, setLoading] = useState(!records);

  // 🔹 props가 없으면 API 호출
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

  const isEmpty = useMemo(
    () => !loading && (!list || list.length === 0),
    [loading, list]
  );

  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Typography variant="h6" fontWeight={700}>
            지난 수업 보기
          </Typography>
          <Button component={Link} href="/record/all" size="small" variant="text">
            전체보기
          </Button>
        </Stack>

        <Divider />

        {isEmpty ? (
          <Box
            sx={{
              py: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="body1">아직 진행한 수업이 없어요!</Typography>
            <Button component={Link} href="/record/new" variant="outlined" size="small">
              운동하러 가기
            </Button>
          </Box>
        ) : (
          <Stack divider={<Divider />} sx={{ mt: 1 }}>
            {(list ?? []).map((it) => {
              const title = `${dateString(it.startTime, it.endTime)}  |  참여인원 ${participantString(it)}명`;
              const desc = exerciseString(it);
              const cta = it.surveysExist ? "자세히보기" : "작성하기";
              const href = it.surveysExist
                ? `/record/${it.recordId}/detail`
                : `/record/${it.recordId}/write`;

              return (
                <Box key={it.recordId} sx={{ py: 2 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                    <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {desc}
                      </Typography>
                    </Stack>

                    <Button component={Link} href={href} variant="outlined" size="small">
                      {cta}
                    </Button>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}