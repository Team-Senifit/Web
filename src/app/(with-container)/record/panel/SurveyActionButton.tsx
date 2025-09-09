"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CTAButton from "@/components/CTAButton";
import type { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import { axiosClient } from "@/apis/axiosClient";
import { isAuthError } from "@/apis/errors";

type Mode = "write" | "detail" | "update";

type StepperProps = {
  show: boolean;
  canPrev: boolean;
  isFinal: boolean;
  onPrev: () => void;
  onNext: () => void; // 마지막 단계에선 저장 실행을 요청받음
};

type Props = {
  recordId: number;
  mode: Mode;
  elders: Elder[];
  pending: Record<number, ElderUpdatePayload>;
  afterSaveHref?: string;
  gap?: number;
  alignRight?: boolean;
  mobileStepper?: StepperProps; // ← 추가
};

export default function SurveyActionButton({
  recordId,
  mode,
  elders,
  pending,
  afterSaveHref = "/record",
  gap = 2,
  alignRight = true,
  mobileStepper,
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

      await axiosClient.put(`/records/${recordId}/surveys`, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["surveys", recordId] });
      router.push(afterSaveHref);
    },
    onError: (error) => {
      if (error instanceof isAuthError) {
        router.push("/login");
        return;
      }
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  const goEdit = () => router.push(`/record/update/${recordId}`);

  // 모바일: 스텝퍼 모드
  if (mobileStepper?.show) {
    const finalLabel = mode === "write" ? "작성 완료" : "저장하기";
    const nextLabel = mobileStepper.isFinal ? finalLabel : "다음";

    const handleNext = () => {
      if (mobileStepper.isFinal)
        save(); // 마지막이면 저장
      else mobileStepper.onNext();
    };

    return (
      <Box sx={{ mt: 3, display: "flex", gap: 1.5 }}>
        <Button
          onClick={mobileStepper.canPrev ? mobileStepper.onPrev : undefined}
          sx={{
            flex: 1,
            bgcolor: (t) => t.palette.fillVariants.colored,
            color: (t) => t.palette.primary.main,
            borderRadius: "12px",
            py: 1.5,
          }}
        >
          <Typography variant={"Heading1"}>{"이전"}</Typography>
        </Button>
        <Button
          onClick={handleNext}
          sx={{
            flex: 1,
            bgcolor: (t) => t.palette.primary.main,
            color: (t) => t.palette.static.white,
            borderRadius: "12px",
            py: 1.5,
          }}
        >
          <Typography variant={"Heading1"}>{nextLabel}</Typography>
        </Button>
      </Box>
    );
  }

  // 데스크탑/태블릿: 기존 버튼 렌더링
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
