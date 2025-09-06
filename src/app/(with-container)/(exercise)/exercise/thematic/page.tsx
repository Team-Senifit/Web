"use client";

import ReturnButton from "@/components/ReturnButton";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import PageInfoCard from "@/components/PageInfoCard";
import { ClipboardCheckIcon } from "@/components/icons";
import Field from "../../panel/Field";
import { useForm } from "react-hook-form";
import { IThematicRoutineField } from "@/types/IThematicRoutine";
import SenifitToggleButtonGroupField from "@/components/SenifitToggleButtonGroupField";
import {
  cognitiveOptionsThematic,
  primaryTargetOptionsThematic,
  singingOptionsThematic,
} from "../customized/panel/options";
import useMedia from "@/hooks/useMedia";
import useProgramStore from "@/states/useProgramStore";
import {
  COGNITIVE_WORKOUT_CODES,
  SINGING_WORKOUT_CODES,
  CALISTHENIC_TARGET_CODES,
  ROUTINE_TYPES,
} from "@/types/IRoutine";
import { IExerciseNewPayload } from "@/types/IRoutineDetail";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const { isDesktop } = useMedia();

  const { setSelectedRoutineRecord } = useProgramStore();

  const { control, handleSubmit } = useForm<IThematicRoutineField>({
    defaultValues: {
      workout_kind: "workout_kinds_cognitive_kinds_taekwondo",
    },
  });

  const onSubmit = (data: IThematicRoutineField) => {
    const workoutKind = data.workout_kind;

    const routineKind: ROUTINE_TYPES = "workout_programs_selections_byTarget";
    const cognitiveKind: COGNITIVE_WORKOUT_CODES = workoutKind.includes(
      "workout_kinds_cognitive_kinds_",
    )
      ? (workoutKind as COGNITIVE_WORKOUT_CODES)
      : "workout_notSelected";
    const singingKind: SINGING_WORKOUT_CODES = workoutKind.includes(
      "workout_kinds_singing_kinds_",
    )
      ? (workoutKind as SINGING_WORKOUT_CODES)
      : "workout_notSelected";
    const targetKind: CALISTHENIC_TARGET_CODES = workoutKind.includes(
      "workout_kinds_calisthenic_kinds_",
    )
      ? (workoutKind as CALISTHENIC_TARGET_CODES)
      : "workout_notSelected";

    setSelectedRoutineRecord({
      routineKind,
      cognitiveKind,
      singingKind,
      targetKind,
    } as IExerciseNewPayload);

    router.push(`/exercise/thematic/${workoutKind}`);
  };
  return (
    <Stack
      direction={"column"}
      spacing={3}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ReturnButton href={"/"} />
      <ExercisePageInfoCard
        title={"주제별 운동 프로그램"}
        description={
          "하고 싶은 주제를 선택하여\n운동 프로그램을 진행할 수 있어요"
        }
      />
      <Stack
        spacing={3}
        sx={{
          p: [3, 6],
          bgcolor: "background.paper",
          borderRadius: [undefined, "0.75rem"],
        }}
      >
        <PageInfoCard
          icon={
            <ClipboardCheckIcon
              strokeWidth={2}
              sx={{
                color: "label.neutral",
              }}
            />
          }
          title={"주제 선택하기"}
        />
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Field label={"인지운동"} id={""}>
          <SenifitToggleButtonGroupField
            name={"workout_kind"}
            options={cognitiveOptionsThematic}
            control={control}
            maxItemsPerRow={{
              phone: 1,
              tablet: 2,
              desktop: 4,
            }}
            buttonProps={{
              sx: {
                wordBreak: "keep-all",
              },
            }}
          />
        </Field>
        <Field label={"부위"} id={""}>
          <SenifitToggleButtonGroupField
            name={"workout_kind"}
            options={primaryTargetOptionsThematic}
            control={control}
            maxItemsPerRow={{
              phone: 1,
              tablet: 2,
              desktop: 4,
            }}
            buttonProps={{
              sx: {
                wordBreak: "keep-all",
              },
            }}
          />
        </Field>
        <Field label={"노래 체조"} id={""}>
          <SenifitToggleButtonGroupField
            name={"workout_kind"}
            options={singingOptionsThematic}
            control={control}
            maxItemsPerRow={{
              phone: 1,
              tablet: 2,
              desktop: 4,
            }}
          />
        </Field>

        <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
          <Button
            // component={Link}
            // href={`/exercise/thematic/${workoutKind}`}
            type={"submit"}
            variant={"contained"}
            fullWidth={!isDesktop}
            disableElevation
            sx={{
              borderRadius: "0.75rem",
              px: 8,
              py: 2,
            }}
          >
            <Typography variant={"Heading1"}>{"다음"}</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
