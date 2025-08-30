"use client";

import ReturnButton from "@/app/(with-footer)/my-center/members/panel/ReturnButton";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import PageInfoCard from "@/components/PageInfoCard";
import { SettingsIcon } from "@/components/icons";
import useMedia from "@/hooks/useMedia";
import { ICustomizedRoutineField } from "@/types/ICustomizedRoutine";
import { useForm } from "react-hook-form";
import SenifitToggleButtonGroupField from "@/components/SenifitToggleButtonGroupField";
import {
  durationOptions,
  cognitiveOptions,
  primaryTargetOptions,
  singingOptions,
} from "./panel/options";

const Field = ({
  label,
  id,
  children,
  isPhone,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  tabletDirection?: "column" | "row";
  isPhone?: boolean;
}) => {
  return (
    <Stack direction={"column"} spacing={1} width={"100%"}>
      <Stack direction={"row"} spacing={0.5} pt={[0, 2]}>
        <Typography
          component={"label"}
          htmlFor={id}
          variant={isPhone ? "Headline1" : "Title3"}
          sx={{ color: "label.normal", wordBreak: "keep-all" }}
        >
          {label}
        </Typography>
        <Typography component={"span"} sx={{ color: "primary.main" }}>
          {" *"}
        </Typography>
      </Stack>

      {children}
    </Stack>
  );
};

const Page = () => {
  const { isPhone, isDesktop } = useMedia();

  const { control } = useForm<ICustomizedRoutineField>({
    mode: "onSubmit",
  });

  return (
    <Stack spacing={[2, 3]}>
      <ReturnButton href={"/"} />
      <ExercisePageInfoCard
        title={"맞춤형 운동 프로그램"}
        description={
          "몇 가지 옵션을 선택하면 우리 센터에 딱 맞는 맞춤형 프로그램을 진행할 수 있어요!"
        }
      />
      <Stack
        direction={"column"}
        spacing={3}
        sx={{
          bgcolor: "background.paper",
          p: [3],
          borderRadius: [undefined, "0.75rem"],
        }}
      >
        <PageInfoCard
          icon={
            <SettingsIcon
              sx={{ color: "label.neutral", width: "1.5rem", height: "1.5rem" }}
              strokeWidth={2}
            />
          }
          title={"운동 옵션 선택하기"}
        />
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Field label={"진행 시간"} id={"exerciseGoal"} isPhone={isPhone}>
          <SenifitToggleButtonGroupField
            control={control}
            name={"duration"}
            exclusive
            options={durationOptions}
            buttonProps={{
              fullWidth: true,
            }}
          />
        </Field>
        <Field
          label={"인지운동"}
          id={"cognitive_workout_code"}
          isPhone={isPhone}
        >
          <SenifitToggleButtonGroupField
            control={control}
            name={"cognitive_workout_code"}
            exclusive
            options={cognitiveOptions}
            groupProps={{
              sx: { flexWrap: "wrap", gap: 2, maxWidth: "100%" },
            }}
            buttonProps={{
              fullWidth: true,
              sx: {
                minWidth: "9.5rem",
                flex: "unset",
                flexGrow: "unset",
                width: "fit-content !important",
                wordBreak: "keep-all",
              },
            }}
          />
        </Field>
        <Field label={"주요 부위"} id={"primary_target_code"} isPhone={isPhone}>
          <SenifitToggleButtonGroupField
            control={control}
            name={"primary_target_code"}
            exclusive
            options={primaryTargetOptions}
            groupProps={{
              sx: { flexWrap: "wrap", gap: 2, maxWidth: "100%" },
            }}
            buttonProps={{
              fullWidth: true,
              sx: {
                minWidth: "9.5rem",
                flex: "unset",
                flexGrow: "unset",
                width: "fit-content !important",
                wordBreak: "keep-all",
              },
            }}
          />
        </Field>
        <Field
          label={"노래체조 여부"}
          id={"singing_workout_code"}
          isPhone={isPhone}
        >
          <SenifitToggleButtonGroupField
            control={control}
            name={"singing_workout_code"}
            exclusive
            options={singingOptions}
            buttonProps={{
              fullWidth: true,
            }}
          />
        </Field>
        <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
          <Button
            type={"submit"}
            variant={"contained"}
            fullWidth={!isDesktop}
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
