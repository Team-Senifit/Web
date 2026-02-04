"use client";

import { Box, Collapse, Typography, Divider, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState, useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import SurveyElderCard, { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import SelectorCard from "./SelectorCard";
import SelectorRadio from "./SelectorRadio";
import SelectorTarget from "./SelectorTarget";
import SurveyActionButton from "./SurveyActionButton";
import useMedia from "@/hooks/useMedia";
import { useForm, FormProvider } from "react-hook-form";
import { AuthError } from "@/apis/errors";
import { useCallback } from "react";

import useProgramStore from "@/states/useProgramStore";

type Scale = "veryGood" | "good" | "neutral" | "bad" | "veryBad";
type Mode = "write" | "detail" | "update";

type Props = { recordId: number; mode: Mode };

type FormValues = { [key: string]: string };

export default function SurveySection({ recordId, mode }: Props) {
  const { isPhone, isTablet } = useMedia();
  const { type } = useProgramStore();

  const classType = useCallback(() => {
    if (!type) return "알 수 없음";
    if (type === "customized") return "맞춤형";
    if (type === "popular") return "인기";
    if (Array.isArray(type) && type[0] === "thematic") return "주제별";
    return "알 수 없음";
  }, [type])();

  const readOnly = mode === "detail";

  const methods = useForm<FormValues>({ defaultValues: {} });

  // 타이틀 분기
  const bigTitleVariant = isPhone
    ? "Headline1"
    : isTablet
      ? "Title2"
      : "Title1";

  // 공통(전체) 섹션 (얘를 수정하면, 어르신들 모두 공통으로 수정됨)
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

  // 어르신 섹션 (어르신들 각각의 컴포넌트를 open할지 말지를 결정)
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Record<number, ElderUpdatePayload>>(
    {},
  );

  // GET
  const { data: elders = [] } = useSuspenseQuery<Elder[]>({
    queryKey: ["surveys", recordId],
    queryFn: async () => {
      // 서버 환경(SSR)에서 상대 경로 fetch가 실패하는 문제를 해결하기 위해 BASE_URL 처리
      const isServer = typeof window === "undefined";
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || "/api";
      const baseUrl = isServer ? `${siteUrl}${apiBase}` : "/api";

      const res = await fetch(`${baseUrl}/records/${recordId}/surveys`, {
        credentials: "include",
      });
      if (res.status === 401) throw new AuthError();
      if (!res.ok) throw new Error(`[${res.status}] ${res.statusText}`);
      const json = await res.json();

      console.log("GET /api/records/" + recordId + "/surveys response:", json);

      const reverseTroublePartMap: Record<string, string> = {
        workout_kinds_calisthenic_targets_shoulders: "어깨",
        workout_kinds_calisthenic_targets_arms: "팔",
        workout_kinds_calisthenic_targets_legs: "다리",
        workout_kinds_calisthenic_targets_back: "등",
        workout_kinds_calisthenic_targets_abs: "배",
      };

      const surveys = (json?.data?.surveys ?? []).map((s: unknown) => {
        const raw = s as {
          troubleParts?: (string | { target: string })[];
          memo?: string;
        } & Elder;

        // 서버 troubleParts -> 한글 배열로 변환
        const normalizedParts = Array.isArray(raw.troubleParts)
          ? raw.troubleParts
              .map((p) => (typeof p === "string" ? p : p.target))
              .map((code) => reverseTroublePartMap[code] || code)
              .filter(Boolean)
          : [];

        return {
          ...raw,
          troubleParts: normalizedParts,
          isDeleted: Boolean(raw.isDeleted) || raw.surveyId === null,
        };
      });

      return surveys as Elder[];
    },
  });

  useEffect(() => {
    const defaults = Object.fromEntries(
      elders
        .filter((e) => e.surveyId !== null)
        .map((e) => [`memo-${e.surveyId}`, e.memo ?? ""]),
    );
    methods.reset(defaults);
  }, [elders, methods]);

  const handleChange = useCallback(
    (surveyId: number, payload: ElderUpdatePayload) => {
      if (surveyId === null) return;
      setPending((prev) => ({ ...prev, [surveyId]: payload }));
    },
    [],
  );

  // 모바일: 단일 스텝(공통 0→1→2 → 어르신 0→1→2) (화면이 작아서, 3개의 설문 요소를 각각의 페이지에서 수행)
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
    <FormProvider {...methods}>
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
                readOnly={readOnly}
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
                readOnly={readOnly}
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
                readOnly={readOnly}
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
          {elders.map((elder, idx) => (
            <SurveyElderCard
              key={elder.surveyId ?? `deleted-elder-${idx}`}
              elder={elder}
              onChange={handleChange}
              presetAtt={armed.att ? attAll : undefined}
              presetAbl={armed.abl ? ablAll : undefined}
              presetTrouble={armed.trouble ? discomfortAll : undefined}
              step={isPhone ? step : undefined} // ← 한 단계씩 표시
              readOnly={readOnly}
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
        classType={classType}
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
    </FormProvider>
  );
}
