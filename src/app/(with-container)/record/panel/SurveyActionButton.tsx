"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CTAButton from "@/components/CTAButton";
import type { Elder, ElderUpdatePayload } from "./SurveyElderCard";

type Mode = "write" | "detail" | "update";

type Props = {
  recordId: number;
  mode: Mode;
  elders: Elder[];
  pending: Record<number, ElderUpdatePayload>;
  afterSaveHref?: string;
  gap?: number;
  alignRight?: boolean;
};

export default function SurveyActionButton({
  recordId,
  mode,
  elders,
  pending,
  afterSaveHref = "/record",
  gap = 2,
  alignRight = true,
}: Props) {
  const router = useRouter();
  const qc = useQueryClient();

  const { mutate: save } = useMutation({
    mutationFn: async () => {
      const troublePartMap: Record<string, string> = {
        어깨: "workout_kinds_calisthenic_targets_shoulders",
        팔: "workout_kinds_calisthenic_targets_arms",
        다리: "workout_kinds_calisthenic_targets_legs",
        등: "workout_kinds_calisthenic_targets_back",
        배: "workout_kinds_calisthenic_targets_abs",
      };

      const payload = elders.map((e) => {
        const p = pending[e.surveyId];
        const rawParts = p?.troubleParts ?? e.troubleParts ?? [];
        const mappedParts = rawParts.map(
          (part) => troublePartMap[part] ?? part,
        );
        return {
          surveyId: e.surveyId,
          troubleParts: mappedParts,
          attitudeScore: p?.attitudeScore ?? e.attitudeScore,
          abilityScore: p?.abilityScore ?? e.abilityScore,
          hadTrouble: p?.hadTrouble ?? e.hadTrouble,
        };
      });

      if (payload.length > 0) {
        console.log("PUT request first element:", payload[0]);
      }

      const res = await fetch(`/api/records/${recordId}/surveys`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`[${res.status}] ${res.statusText} ${text}`);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["surveys", recordId] });
      router.push(afterSaveHref);
    },
  });

  const goEdit = () => {
    router.push(`/record/update/${recordId}`);
  };

  // 페이지 타입별 버튼 구성
  const renderButtons = () => {
    switch (mode) {
      case "write":
        // 작성 중인 수업
        return (
          <CTAButton
            text={"작성 완료"}
            onClick={() => save()}
            sx={{
              bgcolor: (t) => t.palette.primary.main,
              color: (t) => t.palette.static.white,
            }}
          />
        );
      case "detail":
        // 수업 정보
        return (
          <>
            <CTAButton
              text={"수정하기"}
              onClick={goEdit}
              sx={{
                bgcolor: (t) => t.palette.fillVariants.colored,
                color: (t) => t.palette.primary.main,
              }}
            />
            <CTAButton
              text={"저장하기"}
              onClick={() => console.log("nothing")}
              sx={{
                bgcolor: (t) => t.palette.primary.main,
                color: (t) => t.palette.static.white,
              }}
            />
          </>
        );
      case "update":
        // 수정 중인 수업
        return (
          <CTAButton
            text={"저장하기"}
            onClick={() => save()}
            sx={{
              bgcolor: (t) => t.palette.primary.main,
              color: (t) => t.palette.static.white,
            }}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        justifyContent: alignRight ? "flex-end" : "flex-start",
        gap,
      }}
    >
      {renderButtons()}
    </Box>
  );
}
