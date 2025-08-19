"use client";
import SenifitTextField from "@/components/SenifitTextField";
import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import BirthDatePicker from "./BirthDatePicker";
import { Gender, IMemberEditFormValue, MemberRank } from "@/types/IMemberEdit";
import { SquareUserRoundIcon } from "@/components/icons";
import PageInfoCard from "@/components/PageInfoCard";
import useMedia from "@/hooks/useMedia";
import SenifitToggleButtonGroup from "@/components/SenifitToggleButtonGroup";
import { ISenifitToggleOption } from "@/types/IToggleButton";
import MemberRankPicker from "./edit-form/MemberRankPicker";

const RequiredField = () => {
  return (
    <Typography component={"span"} sx={{ color: "primary.main" }}>
      {" *"}
    </Typography>
  );
};

const EditForm = ({
  isEdit = false,
  defaultValues,
}: {
  isEdit?: boolean;
  defaultValues?: Partial<IMemberEditFormValue>;
}) => {
  const { isDesktop } = useMedia();

  const methods = useForm<IMemberEditFormValue>({
    defaultValues,
  });

  const { handleSubmit, control, watch, setValue } = methods;

  const onSubmit = (data: IMemberEditFormValue) => {
    console.log("Submitted data:", data);
    // api 요청 로직 추가
  };

  const genderOptions = [
    { value: 2, label: <Typography variant="Headline1">여성</Typography> },
    { value: 1, label: <Typography variant="Headline1">남성</Typography> },
  ] as ISenifitToggleOption<Gender>[];

  const gender = watch("gender");

  const memberRankOptions = [
    {
      value: 1,
      label: <Typography variant="Headline1">1등급</Typography>,
    },
    {
      value: 2,
      label: <Typography variant="Headline1">2등급</Typography>,
    },
    {
      value: 3,
      label: <Typography variant="Headline1">3등급</Typography>,
    },
    {
      value: 4,
      label: <Typography variant="Headline1">4등급</Typography>,
    },
    {
      value: 5,
      label: <Typography variant="Headline1">5등급</Typography>,
    },
    {
      value: 6,
      label: <Typography variant="Headline1">인지지원등급</Typography>,
    },
    {
      value: 0,
      label: <Typography variant="Headline1">등급외</Typography>,
    },
  ] as ISenifitToggleOption<MemberRank>[];

  const memberRank = watch("memberRank");

  return (
    <Stack
      direction="column"
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        bgcolor: "background.paper",
        p: [3, 6],
      }}
    >
      <PageInfoCard
        title={`어르신 ${isEdit ? "수정하기" : "등록하기"}`}
        icon={
          <SquareUserRoundIcon
            stroke="2"
            sx={{ color: "label.neutral", w: 3, h: 3 }}
          />
        }
      />
      <Divider sx={{ w: 1 }} />
      <Typography
        component={"label"}
        htmlFor="name"
        variant={isDesktop ? "Title3" : "Headline1"}
      >
        {"성함"}
        <RequiredField />
      </Typography>
      <SenifitTextField
        control={control}
        name="name"
        autoComplete="off"
        placeholder="성함을 입력하세요"
        rules={{ required: "" }}
      />
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
      <MemberRankPicker
        memberRank={memberRank}
        setValue={setValue}
        memberRankOptions={memberRankOptions}
        control={control}
      />
      <FormProvider {...methods}>
        <BirthDatePicker />
      </FormProvider>
      <Button type="submit" variant="contained" color="primary">
        <Typography>{isEdit ? "수정완료" : "추가"}</Typography>
      </Button>
    </Stack>
  );
};

export default EditForm;
