"use client";

import ReturnButton from "@/components/ReturnButton";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GradationPageInfoCard from "../../../../../components/GradationPageInfoCard";
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
import Field from "../../panel/Field";
import { axiosClient } from "@/apis/axiosClient";
import { IResponse } from "@/types/IResponse";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import useProgramStore from "@/states/useProgramStore";
import { useRouter } from "next/navigation";
import SenifitDialog from "@/components/SenifitDialog";

const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const { isPhone, isDesktop } = useMedia();

  const router = useRouter();

  const {
    setType,
    setSelectedProgram,
    selectedRoutineRecord,
    setSelectedRoutineRecord,
  } = useProgramStore();

  useEffect(() => {
    setSelectedProgram(null);
    return () => {};
  }, [setSelectedProgram]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ICustomizedRoutineField>({
    mode: "onSubmit",
  });

  const onSubmit = async (data: ICustomizedRoutineField) => {
    const {
      data: { data: selectedProgram },
    } = await axiosClient.post<IResponse<Array<IRoutineDetail>>>(
      "/programs/recommendation/by-personal",
      data,
    );
    setType("customized");
    if (selectedProgram.length === 0) {
      setOpenErrorDialog(true);
      return;
    }
    setSelectedRoutineRecord({
      ...selectedRoutineRecord,
      programId: selectedProgram[0].id,
      routineKind: "workout_programs_selections_byPersonal",
      cognitiveKind: data.cognitive_workout_code,
      targetKind: data.primary_target_code,
      singingKind: data.singing_workout_code,
    });
    router.push("/exercise/members");
  };

  return (
    <>
      <Stack spacing={[2, 3]}>
        <ReturnButton href={"/"} />
        <Stack spacing={3}>
          <GradationPageInfoCard
            title={"맞춤형 운동 프로그램"}
            description={
              "몇 가지 옵션을 선택하면 우리 센터에 딱 맞는 맞춤형 프로그램을 진행할 수 있어요!"
            }
          />
          <Stack
            component={"form"}
            onSubmit={handleSubmit(onSubmit, () => {
              setOpenDialog(true);
            })}
            direction={"column"}
            spacing={3}
            sx={{
              bgcolor: "background.paper",
              boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
              p: [3, 6],
              borderRadius: [undefined, "0.75rem"],
            }}
          >
            <PageInfoCard
              icon={
                <SettingsIcon
                  sx={{
                    color: "label.neutral",
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                  strokeWidth={2}
                />
              }
              title={"운동 옵션 선택하기"}
            />
            <Divider sx={{ borderColor: "borderVariants.normal" }} />
            <Field
              required
              label={"진행 시간"}
              id={"exerciseGoal"}
              isPhone={isPhone}
            >
              <SenifitToggleButtonGroupField
                rules={{
                  required: true,
                }}
                control={control}
                name={"duration"}
                exclusive
                options={durationOptions}
                maxItemsPerRow={2}
              />
            </Field>
            <Field
              required
              label={"인지운동"}
              id={"cognitive_workout_code"}
              isPhone={isPhone}
            >
              <SenifitToggleButtonGroupField
                rules={{
                  required: true,
                }}
                control={control}
                name={"cognitive_workout_code"}
                exclusive
                options={cognitiveOptions}
                maxItemsPerRow={{
                  phone: 2,
                  tablet: 4,
                }}
              />
            </Field>
            <Field
              required
              label={"주요 부위"}
              id={"primary_target_code"}
              isPhone={isPhone}
            >
              <SenifitToggleButtonGroupField
                rules={{
                  required: true,
                }}
                control={control}
                name={"primary_target_code"}
                exclusive
                options={primaryTargetOptions}
                maxItemsPerRow={{
                  phone: 2,
                  tablet: 4,
                }}
              />
            </Field>
            <Field
              required
              label={"노래체조 여부"}
              id={"singing_workout_code"}
              isPhone={isPhone}
            >
              <SenifitToggleButtonGroupField
                rules={{
                  required: true,
                }}
                control={control}
                name={"singing_workout_code"}
                exclusive
                options={singingOptions}
                maxItemsPerRow={2}
              />
            </Field>
            <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
              <Button
                loading={isSubmitting}
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
      </Stack>
      <SenifitDialog
        dialogType={"error"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title={"운동루틴 옵션을 선택해주세요."}
        primaryText={"확인"}
        onPrimaryClick={() => setOpenDialog(false)}
      />
      <SenifitDialog
        dialogType={"error"}
        isOpen={openErrorDialog}
        onClose={() => setOpenErrorDialog(false)}
        title={"조건에 맞는 프로그램이 없어요."}
        body={"다른 옵션으로 선택하여 다시 시도해주세요."}
        primaryText={"확인"}
        onPrimaryClick={() => setOpenErrorDialog(false)}
      />
    </>
  );
};

export default Page;
