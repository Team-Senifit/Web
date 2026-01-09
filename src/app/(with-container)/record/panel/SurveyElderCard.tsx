"use client";

import { Box, Divider, Typography } from "@mui/material";
import SelectorCard from "./SelectorCard";
import SelectorRadio from "./SelectorRadio";
import SelectorTarget from "./SelectorTarget";
import { useState, useEffect, useCallback, useRef } from "react";
import { calculateAge } from "@/utils/calculateAge";
import dayjs from "dayjs";
import { genderLabel, gradeLabel } from "@/types/IMember";
import useMedia from "@/hooks/useMedia";
import SenifitTextField from "@/components/SenifitTextField";
import { useFormContext } from "react-hook-form";
import ProfileIcon from "@/components/icons/ProfileIcon";

type Scale = "veryGood" | "good" | "neutral" | "bad" | "veryBad";
const scoreOf: Record<Scale, number> = {
  veryGood: 4,
  good: 3,
  neutral: 2,
  bad: 1,
  veryBad: 0,
};

export type Elder = {
  surveyId: number;
  name: string;
  birthDate: string;
  gender: number; // 1: 남, 0: 여
  memberRank: number; // 1~6, 0
  troubleParts: string[];
  attitudeScore: number;
  abilityScore: number;
  hadTrouble: boolean;
  updatedAt?: string;
  memo?: string;
};

type PresetTrouble = { hasDiscomfort: "none" | "yes"; parts: string[] };

type Props = {
  elder: Elder;
  onChange: (surveyId: number, payload: ElderUpdatePayload) => void;
  presetAtt?: Scale;
  presetAbl?: Scale;
  presetTrouble?: PresetTrouble;
  step?: 0 | 1 | 2;
  readOnly?: boolean;
};

export type ElderUpdatePayload = {
  attitudeScore: number;
  abilityScore: number;
  hadTrouble: boolean;
  troubleParts: string[];
  memo?: string;
};

type FormValues = { [key: string]: string };

export default function ElderSurveyCard({
  elder,
  onChange,
  presetAtt,
  presetAbl,
  presetTrouble,
  step,
  readOnly,
}: Props) {
  const { control, getValues } = useFormContext<FormValues>();

  const scaleFromScore = (s?: number): Scale => {
    switch (s) {
      case 4:
        return "veryGood";
      case 3:
        return "good";
      case 2:
        return "neutral";
      case 1:
        return "bad";
      case 0:
        return "veryBad";
      default:
        return "veryGood";
    }
  };
  const [att, setAtt] = useState<Scale>(scaleFromScore(elder.attitudeScore));
  const [abl, setAbl] = useState<Scale>(scaleFromScore(elder.abilityScore));
  const [trouble, setTrouble] = useState<PresetTrouble>({
    hasDiscomfort: elder.hadTrouble ? "yes" : "none",
    parts: elder.troubleParts ?? [],
  });
  const [isMounted, setIsMounted] = useState(false);

  // 부모가 바뀔 때만 실행되도록 함.
  const lastPresetAtt = useRef<Scale | undefined>(presetAtt);
  const lastPresetAbl = useRef<Scale | undefined>(presetAbl);
  const lastPresetTrouble = useRef<PresetTrouble | undefined>(presetTrouble);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isPhone, isTablet } = useMedia();
  const infoVariant = isPhone
    ? "Headline1"
    : isTablet
      ? "Heading2"
      : "Heading1";

  // 각 입력이 바뀔 때마다 상위에 변화를 올려줘서 "작성완료" 시 최신 상태를 보낼 수 있게 함
  const fieldName = `memo-${elder.surveyId}`;

  const bubble = useCallback(
    (next?: Partial<ElderUpdatePayload>) => {
      if (readOnly) return;
      const currentMemo = getValues(fieldName) || "";
      onChange(elder.surveyId, {
        attitudeScore: scoreOf[att],
        abilityScore: scoreOf[abl],
        hadTrouble: trouble.hasDiscomfort === "yes",
        troubleParts: trouble.parts,
        memo: currentMemo,
        ...next,
      });
    },
    [
      readOnly,
      getValues,
      fieldName,
      onChange,
      elder.surveyId,
      att,
      abl,
      trouble,
    ],
  );

  useEffect(() => {
    if (presetAtt && presetAtt !== lastPresetAtt.current) {
      lastPresetAtt.current = presetAtt;
      setAtt(presetAtt);
      bubble({ attitudeScore: scoreOf[presetAtt] });
    }
  }, [presetAtt, bubble]);

  useEffect(() => {
    if (presetAbl && presetAbl !== lastPresetAbl.current) {
      lastPresetAbl.current = presetAbl;
      setAbl(presetAbl);
      bubble({ abilityScore: scoreOf[presetAbl] });
    }
  }, [presetAbl, bubble]);

  useEffect(() => {
    if (
      presetTrouble &&
      (presetTrouble.hasDiscomfort !==
        lastPresetTrouble.current?.hasDiscomfort ||
        presetTrouble.parts !== lastPresetTrouble.current?.parts)
    ) {
      lastPresetTrouble.current = presetTrouble;
      setTrouble(presetTrouble);
      bubble({
        hadTrouble: presetTrouble.hasDiscomfort === "yes",
        troubleParts: presetTrouble.parts,
      });
    }
  }, [presetTrouble, bubble]);

  useEffect(() => {
    bubble();
  }, [bubble]);

  return (
    <>
      <Box
        sx={(t) => ({
          borderRadius: 2,
          bgcolor: t.palette.fillVariants.alternative,
          p: 2,
          border: `1px solid ${t.palette.borderVariants.normal}`,
        })}
      >
        {/* 상단 정보: 모바일 2줄, 그 외 1줄 */}
        {isPhone ? (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ProfileIcon sx={{ fontSize: 24 }} />
              <Typography variant={infoVariant}>{elder.name}</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Typography variant={infoVariant}>
                {isMounted
                  ? calculateAge(dayjs(elder.birthDate), {
                      format: "YYYY-MM-DD",
                    })
                  : ""}
              </Typography>
              <Typography variant={infoVariant}>
                {genderLabel[elder.gender]}
              </Typography>
              <Typography variant={infoVariant}>
                {gradeLabel[elder.memberRank]}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
            <ProfileIcon sx={{ fontSize: 24 }} />
            <Typography variant={infoVariant}>{elder.name}</Typography>
            <Typography variant={infoVariant}>
              {isMounted
                ? calculateAge(dayjs(elder.birthDate), { format: "YYYY-MM-DD" })
                : ""}
            </Typography>
            <Typography variant={infoVariant}>
              {genderLabel[elder.gender]}
            </Typography>
            <Typography variant={infoVariant}>
              {gradeLabel[elder.memberRank]}
            </Typography>
          </Box>
        )}
        {/* 선택 카드: step이 주어지면 한 항목만 렌더 */}
        <SelectorCard
          step={step}
          items={[
            {
              title: "운동 참여 태도",
              control: (
                <SelectorRadio
                  value={att}
                  onChange={(v) => {
                    setAtt(v as Scale);
                    bubble({ attitudeScore: scoreOf[v as Scale] });
                  }}
                  readOnly={readOnly}
                />
              ),
            },
            {
              title: "운동 수행 능력",
              control: (
                <SelectorRadio
                  value={abl}
                  onChange={(v) => {
                    setAbl(v as Scale);
                    bubble({ abilityScore: scoreOf[v as Scale] });
                  }}
                  readOnly={readOnly}
                />
              ),
            },
            {
              title: "운동 중 불편함",
              control: (
                <SelectorTarget
                  hasDiscomfort={trouble.hasDiscomfort}
                  parts={trouble.parts}
                  onChange={(v) => {
                    setTrouble(v);
                    bubble({
                      hadTrouble: v.hasDiscomfort === "yes",
                      troubleParts: v.hasDiscomfort === "yes" ? v.parts : [],
                    });
                  }}
                  readOnly={readOnly}
                />
              ),
            },
          ]}
        />
        {/* 메모 */}
        <Box sx={{ mt: 1, width: "100%" }}>
          <SenifitTextField
            name={`memo-${elder.surveyId}`}
            control={control}
            placeholder={"특이사항이 있다면 메모를 작성해주세요. (선택사항)"}
            onChange={(e) => {
              bubble({ memo: e.target.value });
            }}
            formControlProps={{
              sx: { width: "100%" },
            }}
            readOnly={readOnly}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />
    </>
  );
}
