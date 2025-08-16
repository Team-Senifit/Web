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

type Item = {
  id: string;
  title: string; // 날짜/시간
  headcount: number;
  desc: string;
  cta: "작성하기" | "자세히보기";
  href: string;
};

export default function PastRecords() {
  // 연동 전 임시 아이템
  const items: Item[] = [
    {
      id: "1",
      title: "2025년 07월 07일 13:00~14:01",
      headcount: 15,
      desc: "맞춤형 루틴 : 60분 / 태권도+태권체조 포함 / 튜닝밴드 / 등",
      cta: "작성하기",
      href: "/record/1/edit",
    },
    {
      id: "2",
      title: "2025년 07월 07일 13:00~14:01",
      headcount: 15,
      desc: "인기 루틴 : 하체 완벽 루틴",
      cta: "자세히보기",
      href: "/record/2",
    },
    {
      id: "3",
      title: "2025년 07월 07일 13:00~14:01",
      headcount: 15,
      desc: "구분별 루틴 : 팔어깨",
      cta: "자세히보기",
      href: "/record/3",
    },
  ];

  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1.5}
        >
          <Typography variant="h6" fontWeight={700}>
            지난 수업 보기
          </Typography>
          <Button component={Link} href="/record/all" size="small" variant="text">
            전체보기
          </Button>
        </Stack>

        <Divider />

        <Stack divider={<Divider />} sx={{ mt: 1 }}>
          {items.map((it) => (
            <Box key={it.id} sx={{ py: 2 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ md: "center" }}
                justifyContent="space-between"
                spacing={1}
              >
                <Stack spacing={0.5}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {it.title}
                  </Typography>
                  <Typography variant="body2">
                    참여인원 {it.headcount}명
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {it.desc}
                  </Typography>
                </Stack>

                <Button
                  component={Link}
                  href={it.href}
                  variant="outlined"
                  size="small"
                  sx={{ alignSelf: { xs: "flex-start", md: "initial" }, mt: { xs: 1, md: 0 } }}
                >
                  {it.cta}
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}