"use client";

import {
  Box,
  Button,
  Collapse,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import SurveyElderCard, { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import SelectorCard from "./SelectorCard";
import SelectorRadio from "./SelectorRadio";
import SelectorTarget from "./SelectorTarget";

type Scale = "veryGood" | "good" | "neutral" | "bad" | "veryBad";

type Props = {
  recordId: number;
};

export default function SurveySection({ recordId }: Props) {
  const router = useRouter();
  const qc = useQueryClient();

  // 전체(공통) 섹션 상태
  const [attAll, setAttAll] = useState<Scale>("veryGood");
  const [ablAll, setAblAll] = useState<Scale>("veryGood");
  const [discomfortAll, setDiscomfortAll] = useState<{
    hasDiscomfort: "none" | "yes";
    parts: string[];
  }>({ hasDiscomfort: "none", parts: [] });

  // 어르신 개별 섹션 상태
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Record<number, ElderUpdatePayload>>(
    {},
  );

  // --- GET: /records/{recordId}/surveys (열렸을 때만 요청) ---
  const { data: elders = [] } = useSuspenseQuery<Elder[]>({
    queryKey: ["surveys", recordId],
    enabled: open, // 열렸을 때만 요청 (닫히면 suspend하지 않음)
    queryFn: async () => {
      const res = await fetch(`/api/records/${recordId}/surveys`, {
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`[${res.status}] ${res.statusText} ${text}`);
      }
      const json = await res.json();
      return (json?.data?.surveys as Elder[]) ?? [];
    },
  });

  const toggle = () => setOpen((v) => !v);

  // 어르신 개별 변경 수집
  const handleChange = (surveyId: number, payload: ElderUpdatePayload) => {
    setPending((prev) => ({ ...prev, [surveyId]: payload }));
  };

  // --- PUT: /records/{recordId}/surveys/{surveyId} ---
  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      const entries = Object.entries(pending);
      if (entries.length === 0) return;

      await Promise.all(
        entries.map(async ([sid, body]) => {
          const res = await fetch(`/api/records/${recordId}/surveys/${sid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
          });
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`[${res.status}] ${res.statusText} ${text}`);
          }
        }),
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["surveys", recordId] });
      router.push("/record");
    },
  });

  // 어르신 섹션 펼침 배너
  const Banner = useMemo(
    () => (
      <Box
        onClick={toggle}
        sx={(t) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          height: 56,
          borderRadius: 1.5,
          bgcolor: t.palette.fillVariants.normal,
          cursor: "pointer",
        })}
      >
        <Typography
          variant={"Headline1"}
          sx={(t) => ({ color: t.palette.primary.main })}
        >
          {"어르신 별 개별 기록하기"}
        </Typography>
        <IconButton size={"small"}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    ),
    [open],
  );

  return (
    <>
      {/* ---------- 전체 섹션(페이지 상단) ---------- */}
      <Typography variant={"Title1"} sx={{ mb: 4 }}>
        {"이번 수업은 전체적으로 어땠나요?"}
      </Typography>

      <SelectorCard
        items={[
          {
            title: "운동 참여 태도",
            control: <SelectorRadio value={attAll} onChange={setAttAll} />,
          },
          {
            title: "운동 수행 능력",
            control: <SelectorRadio value={ablAll} onChange={setAblAll} />,
          },
          {
            title: "운동 중 불편함",
            control: (
              <SelectorTarget
                hasDiscomfort={discomfortAll.hasDiscomfort}
                parts={discomfortAll.parts}
                onChange={setDiscomfortAll}
              />
            ),
          },
        ]}
      />

      <Divider sx={{ my: 3 }} />

      {/* ---------- 어르신 별 섹션 ---------- */}
      <Typography variant={"Title1"} sx={{ mb: 2 }}>
        {"어르신 별로 수업이 어땠는지 기록해 주세요."}
      </Typography>

      {/* 배너 */}
      {Banner}

      {/* 펼쳐지는 패널 */}
      <Collapse in={open} unmountOnExit>
        <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
          {elders.map((elder) => (
            <SurveyElderCard
              key={elder.surveyId}
              elder={elder}
              onChange={handleChange}
            />
          ))}
        </Box>
      </Collapse>

      {/* 하단 작성 완료 버튼 */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant={"contained"}
          onClick={() => submit()}
          disabled={isPending || Object.keys(pending).length === 0}
          sx={(t) => ({
            bgcolor: t.palette.primary.main,
            "&:hover": { bgcolor: t.palette.primary.dark },
            px: 3.5,
            py: 1.25,
            borderRadius: 1.5,
          })}
        >
          {"작성 완료"}
        </Button>
      </Box>
    </>
  );
}
