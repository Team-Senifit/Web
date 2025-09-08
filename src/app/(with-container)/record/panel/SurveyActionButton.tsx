"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CTAButton from "@/components/CTAButton";
import type { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import { axiosClient } from "@/apis/axiosClient";
import { isAuthError } from "@/apis/errors";

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
          attitudeScore: p?.attitudeScore ?? e.attitudeScore, // 0~4 점수 사용
          abilityScore: p?.abilityScore ?? e.abilityScore, // 0~4 점수 사용
          hadTrouble: p?.hadTrouble ?? e.hadTrouble,
        };
      });

      if (payload.length > 0) {
        console.log("PUT request first element:", payload[0]);
      }

      await axiosClient.put(`/records/${recordId}/surveys`, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["surveys", recordId] });
      router.push(afterSaveHref);
    },
    onError: (error) => {
      // axiosClient 인터셉터가 401/403에서 AuthError를 throw함
      if (error instanceof isAuthError) {
        router.push("/login"); // 필요하면 next 파라미터 붙이기
        return;
      }
      // 기타 에러는 콘솔/알림 등 처리
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  const goEdit = () => {
    router.push(`/record/update/${recordId}`);
  };

  const renderButtons = () => {
    switch (mode) {
      case "write":
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
