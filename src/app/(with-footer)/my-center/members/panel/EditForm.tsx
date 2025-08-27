"use client";
import SenifitTextField from "@/components/SenifitTextField";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import BirthDatePicker from "./edit-form/BirthDatePicker";
import { Gender, IMemberEditFormValue, MemberRank } from "@/types/IMemberEdit";
import { SquareUserRoundIcon } from "@/components/icons";
import PageInfoCard from "@/components/PageInfoCard";
import useMedia from "@/hooks/useMedia";
import SenifitToggleButtonGroup from "@/components/SenifitToggleButtonGroup";
import { ISenifitToggleOption } from "@/types/IToggleButton";
import MemberRankPicker from "./edit-form/MemberRankPicker";

const Field = ({
  label,
  id,
  children,
  tabletDirection = "row",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  tabletDirection?: "column" | "row";
}) => {
  const { isDesktop } = useMedia();
  return (
    <Stack
      direction={{
        phone: "column",
        tablet: tabletDirection,
        desktop: "row",
      }}
      spacing={{
        phone: 1,
        tablet: 4,
      }}
      width={1}
    >
      <Stack direction={"row"} spacing={0.5} pt={[0, 2]}>
        <Typography
          component={"label"}
          htmlFor={id}
          variant={isDesktop ? "Title3" : "Headline1"}
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

const EditForm = ({
  isEdit = false,
  defaultValues,
}: {
  isEdit?: boolean;
  defaultValues?: Partial<IMemberEditFormValue>;
}) => {
  const methods = useForm<IMemberEditFormValue>({
    defaultValues,
  });

  const { handleSubmit, control, watch, setValue } = methods;

  const onSubmit = (data: IMemberEditFormValue) => {
    console.log("Submitted data:", data);
    // api 요청 로직 추가
  };

  const genderOptions = [
    {
      value: 2,
      label: <Typography variant={"Headline1"}>{"여성"}</Typography>,
    },
    {
      value: 1,
      label: <Typography variant={"Headline1"}>{"남성"}</Typography>,
    },
  ] as ISenifitToggleOption<Gender>[];

  const gender = watch("gender");

  const memberRankOptions = [
    {
      value: 1,
      label: <Typography variant={"Headline1"}>{"1등급"}</Typography>,
    },
    {
      value: 2,
      label: <Typography variant={"Headline1"}>{"2등급"}</Typography>,
    },
    {
      value: 3,
      label: <Typography variant={"Headline1"}>{"3등급"}</Typography>,
    },
    {
      value: 4,
      label: <Typography variant={"Headline1"}>{"4등급"}</Typography>,
    },
    {
      value: 5,
      label: <Typography variant={"Headline1"}>{"5등급"}</Typography>,
    },
    {
      value: 6,
      label: <Typography variant={"Headline1"}>{"인지지원등급"}</Typography>,
    },
    {
      value: 0,
      label: <Typography variant={"Headline1"}>{"등급외"}</Typography>,
    },
  ] as ISenifitToggleOption<MemberRank>[];

  const memberRank = watch("memberRank");

  return (
    <Stack
      direction={"column"}
      spacing={[2, 2, 3]}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        bgcolor: "background.paper",
        p: [3, 6],
        borderRadius: [0, 1.5],
      }}
    >
      <PageInfoCard
        title={`어르신 ${isEdit ? "수정하기" : "등록하기"}`}
        icon={
          <SquareUserRoundIcon
            stroke={"2"}
            sx={{ color: "label.neutral", w: 3, h: 3 }}
          />
        }
      />
      <Divider sx={{ w: 1 }} />
      <Field label={"성함"} id={"name"}>
        <SenifitTextField
          control={control}
          name={"name"}
          autoComplete={"off"}
          placeholder={"성함을 입력하세요"}
        />
      </Field>
      <Field label={"나이"} id={"birthDate"} tabletDirection={"column"}>
        <FormProvider {...methods}>
          <BirthDatePicker isEdit={isEdit} />
        </FormProvider>
      </Field>
      <Field label={"성별"} id={"gender"}>
        <SenifitToggleButtonGroup<Gender>
          value={gender}
          onChange={(newValue) => {
            setValue("gender", newValue);
          }}
          exclusive
          options={genderOptions}
          groupProps={{
            sx: {
              gap: 2,
            },
          }}
          buttonProps={{
            sx: {
              minWidth: "8.5rem",
            },
          }}
        />
      </Field>
      <Field label={"등급"} id={"memberRank"}>
        <MemberRankPicker
          memberRank={memberRank}
          setValue={setValue}
          memberRankOptions={memberRankOptions}
          control={control}
        />
      </Field>

      <Stack direction={"row-reverse"} pt={[1, 2]}>
        <Button
          type={"submit"}
          variant={"contained"}
          color={"primary"}
          sx={{
            width: [1, 1, "fit-content"],
            height: "3.5rem",
            borderRadius: "0.75rem",
            px: 8,
          }}
        >
          <Typography variant={"Heading1"}>
            {isEdit ? "저장하기" : "등록하기"}
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditForm;
