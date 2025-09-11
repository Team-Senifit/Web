"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CTAButton from "@/components/CTAButton";
import type { Elder, ElderUpdatePayload } from "./SurveyElderCard";
import { axiosClient } from "@/apis/axiosClient";
import { isAuthError } from "@/apis/errors";
import SenifitDialog from "@/components/SenifitDialog";

type Mode = "write" | "detail" | "update";
type ConfirmKind = null | "editConfirm" | "saveConfirm";

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
  mobileStepper?: StepperProps;
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

        const hadTrouble = (p?.hadTrouble ?? e.hadTrouble) === true;

        // 불편함이 없다면 parts는 무조건 빈 배열
        const rawParts = hadTrouble
          ? (p?.troubleParts ?? e.troubleParts ?? [])
          : [];

        const mappedParts = rawParts
          .map((part) => troublePartMap[part])
          .filter(Boolean) as string[];

        return {
          surveyId: e.surveyId,
          troubleParts: mappedParts,
          attitudeScore: p?.attitudeScore ?? e.attitudeScore,
          abilityScore: p?.abilityScore ?? e.abilityScore,
          hadTrouble,
          memo: (p?.memo ?? e.memo ?? "").trim(),
        };
      });

      console.log(
        "[Survey] PUT /records/%s/surveys payload:",
        recordId,
        JSON.stringify(payload, null, 2),
      );

      await axiosClient.put(`/records/${recordId}/surveys`, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["surveys", recordId] });
      router.push(afterSaveHref);
    },
    onError: (error: unknown) => {
      if (error instanceof isAuthError) {
        router.push("/login");
        return;
      }
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    },
  });

  const [confirm, setConfirm] = useState<ConfirmKind>(null);

  const openEditConfirm = () => setConfirm("editConfirm");
  const openSaveConfirm = () => setConfirm("saveConfirm");
  const closeConfirm = () => setConfirm(null);
  const goEdit = () => router.push(`/record/update/${recordId}`);

  // 모바일: 스텝퍼 모드
  if (mobileStepper?.show) {
    if (mode === "detail") {
      return (
        <Box sx={{ mt: 3, display: "flex", gap: 1.5 }}>
          <Button
            onClick={openEditConfirm}
            sx={{
              flex: 1,
              bgcolor: (t) => t.palette.fillVariants.colored,
              color: (t) => t.palette.primary.main,
              borderRadius: "12px",
              py: 1.5,
            }}
          >
            <Typography variant={"Heading1"}>{"수정하기"}</Typography>
          </Button>
        </Box>
      );
    }

    const finalLabel = mode === "write" ? "작성 완료" : "저장하기";
    const nextLabel = mobileStepper.isFinal ? finalLabel : "다음";

    const handleNext = () => {
      if (!mobileStepper.isFinal) {
        mobileStepper.onNext();
        return;
      }
      // 마지막 스텝
      if (mode === "update") {
        openSaveConfirm();
      } else {
        save();
      }
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
          <CTAButton
            text={"수정하기"}
            onClick={openEditConfirm}
            sx={{
              bgcolor: (t) => t.palette.fillVariants.colored,
              color: (t) => t.palette.primary.main,
            }}
          />
        );
      case "update":
        return (
          <CTAButton
            text={"저장하기"}
            onClick={openSaveConfirm}
            sx={{
              bgcolor: (t) => t.palette.primary.main,
              color: (t) => t.palette.static.white,
            }}
          />
        );
    }
  };

  return (
    <>
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

      <SenifitDialog
        isOpen={confirm === "editConfirm"}
        onClose={closeConfirm}
        dialogType={"info"}
        title={"기록을 수정하시겠습니까?"}
        primaryText={"수정하기"}
        secondaryText={"돌아가기"}
        onPrimaryClick={() => {
          closeConfirm();
          goEdit();
        }}
        onSecondaryClick={closeConfirm}
      />

      <SenifitDialog
        isOpen={confirm === "saveConfirm"}
        onClose={closeConfirm}
        dialogType={"info"}
        title={"수정한 기록을 저장하시겠습니까?"}
        primaryText={"저장하기"}
        secondaryText={"돌아가기"}
        onPrimaryClick={() => {
          closeConfirm();
          save();
        }}
        onSecondaryClick={closeConfirm}
      />
    </>
  );
}
