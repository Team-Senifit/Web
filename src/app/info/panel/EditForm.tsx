"use client";
import SenifitRadioButtonGroup from "@/components/SenifitRadioButtonGroup";
import SenifitTextField from "@/components/SenifitTextField";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const EditForm = ({
  isEdit = false,
  defaultValues,
}: {
  isEdit?: boolean;
  defaultValues?: Partial<IMember>;
}) => {
  const { handleSubmit, control } = useForm<Omit<IMember, "id">>({
    defaultValues,
  });

  const onSubmit = (data: Omit<IMember, "id">) => {
    console.log("Submitted data:", data);
    // api 요청 로직 추가
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>{`등록 어르신 ${isEdit ? "수정" : "추가"}`}</Typography>
      <SenifitTextField
        control={control}
        name="name"
        label="이름"
        placeholder="이름을 입력하세요"
        rules={{ required: "이름은 필수입니다" }}
      />
      <SenifitRadioButtonGroup
        control={control}
        name="gender"
        label="성별"
        row
        options={[
          { value: "남성", label: "남성" },
          { value: "여성", label: "여성" },
        ]}
        rules={{ required: "성별을 선택해주세요" }}
      />
      <SenifitRadioButtonGroup
        control={control}
        name="grade"
        label="등급"
        row
        options={[
          { value: "1등급", label: "1등급" },
          { value: "2등급", label: "2등급" },
          { value: "3등급", label: "3등급" },
          { value: "4등급", label: "4등급" },
          { value: "5등급", label: "5등급" },
          { value: "인지지원등급", label: "인지지원등급" },
          { value: "등급외", label: "등급외" },
        ]}
        rules={{ required: "등급을 선택해주세요" }}
      />
      <Button type="submit" variant="contained" color="primary">
        <Typography>{isEdit ? "수정완료" : "추가"}</Typography>
      </Button>
    </form>
  );
};

export default EditForm;
