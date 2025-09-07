"use client";

import { Box, Collapse, Typography, Divider, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import SurveyElderCard, { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import SelectorCard from "./SelectorCard";
import SelectorRadio from "./SelectorRadio";
import SelectorTarget from "./SelectorTarget";
import SurveyActionButton from "./SurveyActionButton";

type Scale = "veryGood" | "good" | "neutral" | "bad" | "veryBad";
type Mode = "write" | "detail" | "update";

type Props = {
  recordId: number;
  mode: Mode;
};

export default function SurveySection({ recordId, mode }: Props) {
  // 전체(공통) 섹션 상태
  const [attAll, setAttAll] = useState<Scale>("veryGood");
  const [ablAll, setAblAll] = useState<Scale>("veryGood");
  const [discomfortAll, setDiscomfortAll] = useState<{
    hasDiscomfort: "none" | "yes";
    parts: string[];
  }>({ hasDiscomfort: "none", parts: [] });
  const [armed, setArmed] = useState({
    att: false,
    abl: false,
    trouble: false,
  });

  // 어르신 개별 섹션 상태
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<Record<number, ElderUpdatePayload>>(
    {},
  );

  // --- GET: /records/{recordId}/surveys ---
  const { data: elders = [] } = useSuspenseQuery<Elder[]>({
    queryKey: ["surveys", recordId],
    queryFn: async () => {
      const res = await fetch(`/api/records/${recordId}/surveys`, {
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`[${res.status}] ${res.statusText} ${text}`);
      }
      const json = await res.json();
      const list = (json?.data?.surveys as Elder[]) ?? [];
      // GET 직후 1번째 어르신 정보 콘솔 출력
      if (list.length > 0) {
        console.log("GET /records/{recordId}/surveys first elder:", list[0]);
      } else {
        console.log("GET /records/{recordId}/surveys: empty list");
      }
      return list;
    },
  });

  const toggle = () => setOpen((v) => !v);

  // 어르신 개별 변경 수집
  const handleChange = (surveyId: number, payload: ElderUpdatePayload) => {
    setPending((prev) => ({ ...prev, [surveyId]: payload }));
  };

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

      {/* ---------- 어르신 별 섹션 ---------- */}
      <Typography variant={"Title1"} sx={{ mb: 2 }}>
        {"어르신 별로 수업이 어땠는지 기록해 주세요."}
      </Typography>

      {/* 배너 */}
      {Banner}

      {/* 펼쳐지는 패널 */}
      <Collapse in={open} /* keepMounted */>
        <Box sx={{ mt: 2, display: "grid", gap: 2 }}>
          {elders.map((elder) => (
            <SurveyElderCard
              key={elder.surveyId}
              elder={elder}
              onChange={handleChange}
              presetAtt={armed.att ? attAll : undefined}
              presetAbl={armed.abl ? ablAll : undefined}
              presetTrouble={armed.trouble ? discomfortAll : undefined}
            />
          ))}
        </Box>
      </Collapse>

      {/* 하단 작성 완료 버튼 */}
      <SurveyActionButton
        recordId={recordId}
        mode={mode}
        elders={elders}
        pending={pending}
        afterSaveHref={"/record"}
      />
    </>
  );
}
