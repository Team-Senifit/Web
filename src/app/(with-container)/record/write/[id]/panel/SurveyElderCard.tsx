"use client";

import { Box, Divider, TextField, Typography } from "@mui/material";
import SelectorCard from "./SelectorCard";
import SelectorRadio from "./SelectorRadio";
import SelectorTarget from "./SelectorTarget";
import { useState } from "react";
import {
  ageFromBirthDate,
  genderLabel,
  memberRankLabel,
} from "@/app/(with-container)/record/utils/recordUtils";

type Scale = "veryGood" | "good" | "neutral" | "bad" | "veryBad";
const scoreOf: Record<Scale, number> = {
  veryGood: 5,
  good: 4,
  neutral: 3,
  bad: 2,
  veryBad: 1,
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
};

type Props = {
  elder: Elder;
  onChange: (surveyId: number, payload: ElderUpdatePayload) => void;
};

export type ElderUpdatePayload = {
  attitudeScore: number;
  abilityScore: number;
  hadTrouble: boolean;
  troubleParts: string[];
  memo?: string;
};

export default function ElderSurveyCard({ elder, onChange }: Props) {
  // 초기값(서버 기본 0 ⇒ veryGood으로 시작하고 싶으면 score 변환해서 세팅)
  const [att, setAtt] = useState<Scale>("veryGood");
  const [abl, setAbl] = useState<Scale>("veryGood");
  const [trouble, setTrouble] = useState<{
    hasDiscomfort: "none" | "yes";
    parts: string[];
  }>({
    hasDiscomfort: elder.hadTrouble ? "yes" : "none",
    parts: elder.troubleParts ?? [],
  });
  const [memo, setMemo] = useState("");

  // 각 입력이 바뀔 때마다 상위에 변화를 올려줘서 "작성완료" 시 최신 상태를 보낼 수 있게 함
  const bubble = (next?: Partial<ElderUpdatePayload>) => {
    onChange(elder.surveyId, {
      attitudeScore: scoreOf[att],
      abilityScore: scoreOf[abl],
      hadTrouble: trouble.hasDiscomfort === "yes",
      troubleParts: trouble.parts,
      memo,
      ...next,
    });
  };

  return (
    <Box
      sx={(t) => ({
        borderRadius: 2,
        bgcolor: t.palette.bg.alternative,
        p: 2,
        border: `1px solid ${t.palette.borderVariants.normal}`,
      })}
    >
      {/* 상단 정보 */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <Typography variant={"Headline1"}>{elder.name}</Typography>
        <Typography variant={"Headline1"}>
          {ageFromBirthDate(elder.birthDate)}
        </Typography>
        <Typography variant={"Headline1"}>
          {genderLabel(elder.gender)}
        </Typography>
        <Typography variant={"Headline1"}>
          {memberRankLabel(elder.memberRank)}
        </Typography>
      </Box>

      <SelectorCard
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
                    troubleParts: v.parts,
                  });
                }}
              />
            ),
          },
        ]}
      />

      {/* 메모 */}
      <Box sx={{ pt: 3, pb: 2 }}>
        <Typography variant={"Body1"} sx={{ mb: 1 }}>
          {"특이사항이 있다면 메모를 작성해주세요. (선택사항)"}
        </Typography>
        <TextField
          placeholder={"메모를 작성해주세요."}
          multiline
          minRows={2}
          onChange={(e) => {
            setMemo(e.target.value);
            bubble({ memo: e.target.value });
          }}
          sx={(t) => ({
            width: "100%",
            "& .MuiInputBase-root": {
              height: "56px",
              borderRadius: "8px",
              background: t.palette.fillVariants.normal,
              padding: "16px",
            },
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          })}
        />
      </Box>

      <Divider sx={{ my: 1 }} />
    </Box>
  );
}
