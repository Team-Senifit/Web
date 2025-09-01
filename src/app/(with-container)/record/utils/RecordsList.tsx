"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import { getRecords, RecordItem } from "./recordUtils";
import RecordBrief from "../panel/RecordBrief";
import RecordButton from "../panel/RecordButton";
import ReloadIcon from "@/components/icons/ReloadIcon";

type Variant = "top3" | "all";

type Props = {
  variant: Variant;
};

const BATCH = 10;

export default function RecordsList({ variant }: Props) {
  const [all, setAll] = useState<RecordItem[]>([]);
  const [visible, setVisible] = useState(variant === "top3" ? 3 : BATCH);
  const [loading, setLoading] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await getRecords();
    setAll(data);
    console.log(data);
    setVisible(variant === "top3" ? 3 : BATCH);
    console.log(visible);
    setLoading(false);
    console.log(loading);
  };

  useEffect(() => {
    load();
  }, [variant]);

  // 무한 스크롤: variant === "all" 일 때만 동작
  useEffect(() => {
    if (variant !== "all" || !sentinelRef.current) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      setVisible((v) => Math.min(v + BATCH, all.length));
    });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [all.length, variant]);

  const list = useMemo(() => all.slice(0, visible), [all, visible]);
  console.log("loading ", loading);
  const isEmpty = !loading && all.length === 0;

  return (
    <Card variant={"outlined"} sx={{ p: 0, borderRadius: "12px", mb: 8 }}>
      <CardContent sx={{ p: 6 }}>
        <Stack spacing={1}>
          <ReloadIcon />
          <Typography variant={"Heading1"}>{"지난 수업 보기"}</Typography>
        </Stack>

        <Divider sx={{ mt: 3 }} />

        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <Stack sx={{ mt: 3 }}>
              {list.map((it, idx) => {
                const cta = it.surveysExist ? "자세히 보기" : "작성하기";
                const href = it.surveysExist
                  ? `/record/detail/${it.recordId}`
                  : `/record/write/${it.recordId}`;

                return (
                  <Box key={it.recordId}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <RecordBrief record={it} />
                      <RecordButton
                        href={href}
                        cta={cta}
                        surveysExist={it.surveysExist}
                      />
                    </Stack>
                    {idx < list.length - 1 && <Divider sx={{ my: 3 }} />}
                  </Box>
                );
              })}
            </Stack>

            {variant === "all" && <Box ref={sentinelRef} sx={{ height: 1 }} />}
          </>
        )}

        {/* 하단 버튼: top3 에서만 노출 */}
        {variant === "top3" && (
          <>
            <Divider sx={{ mt: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                component={Link}
                href={"/record/all"}
                disabled={isEmpty}
                disableElevation
                sx={{
                  borderRadius: "12px",
                  padding: "16px 64px",
                  background: (t) => t.palette.fillVariants.colored,
                }}
              >
                <Typography
                  variant={"Heading1"}
                  sx={{
                    color: (t) =>
                      isEmpty
                        ? t.palette.primary.light
                        : t.palette.primary.main,
                  }}
                >
                  {"이전 수업 전체보기"}
                </Typography>
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Box
      sx={{
        py: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 3,
      }}
    >
      <Typography
        variant={"Heading1"}
        sx={{ color: (t) => t.palette.label.alternative }}
      >
        {"아직 진행한 수업이 없어요"}
      </Typography>

      <Button
        component={Link}
        href={"/"}
        disableElevation
        sx={{
          padding: "16px 64px",
          gap: "10px",
          borderRadius: "12px",
          background: (t) => t.palette.primary.main,
        }}
      >
        <Typography variant={"Heading1"} color={"static.white"}>
          {"수업 시작하러 가기"}
        </Typography>
      </Button>
    </Box>
  );
}
