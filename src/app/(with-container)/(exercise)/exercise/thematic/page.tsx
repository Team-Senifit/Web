"use client";

import ReturnButton from "@/app/(with-footer)/my-center/members/panel/ReturnButton";
import { Button, Stack, Typography } from "@mui/material";
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

const Page = () => {
  const { isPhone, isDesktop } = useMedia();

  const { control, handleSubmit } = useForm<IThematicRoutineField>({
    defaultValues: {
      workout_kind: "workout_kinds_cognitive_kinds_taekwondo",
    },
  });

  const onSubmit = (data: IThematicRoutineField) => {
    console.log(data);
  };

  return (
    <Stack direction={"column"} spacing={3}>
      <ReturnButton href={"/"} />
      <ExercisePageInfoCard
        title={"주제별 운동 프로그램"}
        description={
          "하고 싶은 주제를 선택하여\n운동 프로그램을 진행할 수 있어요"
        }
      />
      <Stack
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
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
          title={"운동 프로그램"}
        />
        <Field label={"인지운동"} id={""}>
          <SenifitToggleButtonGroupField
            name={"workout_kind"}
            options={cognitiveOptionsThematic}
            control={control}
            groupProps={{
              sx: { flexWrap: ["wrap", "unset"] },
            }}
            buttonProps={{
              fullWidth: !isPhone,
              sx: {
                width: ["100%", "auto"],
                p: 0,
                wordBreak: "keep-all",
              },

              // fullWidth: true,
            }}
          />
        </Field>
        <Field label={"부위"} id={""}>
          <SenifitToggleButtonGroupField
            name={"workout_kind"}
            options={primaryTargetOptionsThematic}
            control={control}
            groupProps={{
              sx: { flexWrap: "wrap", gap: 2, maxWidth: "100%" },
            }}
            buttonProps={{
              fullWidth: true,
              sx: {
                minWidth: "9.25rem",
                p: 0,
                flex: "unset",
                flexGrow: "unset",
                width: "fit-content !important",
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
            groupProps={{
              sx: { flexWrap: ["wrap", "unset"] },
            }}
            buttonProps={{
              fullWidth: !isPhone,
              sx: { width: ["100%", "auto"] },
            }}
          />
        </Field>

        <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
          <Button
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
