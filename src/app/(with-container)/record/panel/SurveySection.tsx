"use client";

import { Box, Collapse, Typography, Divider, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import SurveyElderCard, { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import SelectorCard from "./SelectorCard";
import SelectorRadio from "./SelectorRadio";
import SelectorTarget from "./SelectorTarget";
import SurveyActionButton from "./SurveyActionButton";
import useMedia from "@/hooks/useMedia";

type Scale = "veryGood" | "good" | "neutral" | "bad" | "veryBad";
type Mode = "write" | "detail" | "update";

type Props = { recordId: number; mode: Mode };

export default function SurveySection({ recordId, mode }: Props) {
  const { isPhone, isTablet } = useMedia();

  // 타이틀 분기
  const bigTitleVariant = isPhone
    ? "Headline1"
    : isTablet
      ? "Title2"
      : "Title1";

  // 공통(전체) 섹션
  const [attAll, setAttAll] = useState<Scale>("veryGood");
  const [ablAll, setAblAll] = useState<Scale>("veryGood");
  const [discomfortAll, setDiscomfortAll] = useState<{
    hasDiscomfort: "none" | "yes";
    parts: string[];
  }>({
    hasDiscomfort: "none",
    parts: [],
  });
  const [armed, setArmed] = useState({
    att: false,
    abl: false,
    trouble: false,
  });

  // 어르신 섹션
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Record<number, ElderUpdatePayload>>(
    {},
  );

  // GET
  const { data: elders = [] } = useSuspenseQuery<Elder[]>({
    queryKey: ["surveys", recordId],
    queryFn: async () => {
      const res = await fetch(`/api/records/${recordId}/surveys`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`);
      const json = await res.json();
      return (json?.data?.surveys as Elder[]) ?? [];
    },
  });

  const handleChange = (surveyId: number, payload: ElderUpdatePayload) =>
    setPending((prev) => ({ ...prev, [surveyId]: payload }));

  // 모바일: 단일 스텝(공통 0→1→2 → 어르신 0→1→2)
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const canPrev = isPhone && !(step === 0);
  const isFinal = isPhone && step === 2;

  const onPrev = () => {
    if (!isPhone) return;
    if (step === 0) return;
    setStep((s) => (s === 0 ? 0 : ((s - 1) as 0 | 1 | 2)));
  };

  const onNext = () => {
    if (!isPhone) return;
    if (step === 2) return;
    setStep((s) => (s + 1) as 0 | 1 | 2);
    // 마지막 단계 저장은 ActionButton에서 처리
  };

  return (
    <>
      {/* ----- 전체 섹션 ----- */}
      <Typography variant={bigTitleVariant} sx={{ mb: 3 }}>
        {"이번 수업은 전체적으로 어땠나요?"}
      </Typography>

      <SelectorCard
        step={isPhone ? step : undefined}
        items={[
          {
            title: "운동 참여 태도",
            control: (
              <SelectorRadio
                value={attAll}
                onChange={(v) => {
                  setAttAll(v as Scale);
                  setArmed((s) => ({ ...s, att: true }));
                }}
              />
            ),
          },
          {
            title: "운동 수행 능력",
            control: (
              <SelectorRadio
                value={ablAll}
                onChange={(v) => {
                  setAblAll(v as Scale);
                  setArmed((s) => ({ ...s, abl: true }));
                }}
              />
            ),
          },
          {
            title: "운동 중 불편함",
            control: (
              <SelectorTarget
                hasDiscomfort={discomfortAll.hasDiscomfort}
                parts={discomfortAll.parts}
                onChange={(v) => {
                  setDiscomfortAll(v);
                  setArmed((s) => ({ ...s, trouble: true }));
                }}
              />
            ),
          },
        ]}
      />

      <Divider sx={{ my: 3 }} />

      {/* ----- 어르신 섹션 ----- */}
      <Typography variant={bigTitleVariant} sx={{ mb: 2 }}>
        {"어르신 별로 수업이 어땠는지 기록해 주세요."}
      </Typography>

      <Box
        onClick={() => setOpen((v) => !v)}
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

      <Collapse in={open}>
        <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
          {elders.map((elder) => (
            <SurveyElderCard
              key={elder.surveyId}
              elder={elder}
              onChange={handleChange}
              presetAtt={armed.att ? attAll : undefined}
              presetAbl={armed.abl ? ablAll : undefined}
              presetTrouble={armed.trouble ? discomfortAll : undefined}
              step={isPhone ? step : undefined} // ← 한 단계씩 표시
            />
          ))}
        </Box>
      </Collapse>

      {/* 하단 액션: 모바일 스텝퍼 또는 데스크탑/태블릿 버튼 */}
      <SurveyActionButton
        recordId={recordId}
        mode={mode}
        elders={elders}
        pending={pending}
        afterSaveHref={"/record"}
        mobileStepper={
          isPhone
            ? {
                show: true,
                canPrev,
                isFinal,
                onPrev,
                onNext,
              }
            : undefined
        }
      />
    </>
  );
}
