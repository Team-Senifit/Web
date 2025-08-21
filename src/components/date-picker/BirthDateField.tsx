import { TextField } from "@mui/material";
import React from "react";
import SenifitTextField from "../SenifitTextField";
import { Control } from "react-hook-form";
import { IMemberEditFormValue } from "@/types/IMemberEdit";

const BirthDateField = ({
  control,
}: {
  control: Control<IMemberEditFormValue>;
}) => {
  return (
    <>
      <SenifitTextField
        control={control}
        name="year"
        placeholder="생년"
        rules={{
          required: "생년을 입력해주세요.",
        }}
        sx={{
          width: "4.25rem",
        }}
      />
      <SenifitTextField
        control={control}
        name="month"
        placeholder="생월"
        rules={{
          required: "생월을 입력해주세요.",
        }}
        sx={{
          width: "4.25rem",
        }}
      />
      <SenifitTextField
        control={control}
        name="day"
        placeholder="생일"
        rules={{
          required: "생일을 입력해주세요.",
        }}
        sx={{
          width: "4.25rem",
        }}
      />
    </>
  );
};

export default BirthDateField;
