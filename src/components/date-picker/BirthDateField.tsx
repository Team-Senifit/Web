import { TextField } from "@mui/material";
import React from "react";
import SenifitTextField from "../SenifitTextField";
import { Control, useController } from "react-hook-form";

interface IFormValue {
  year: number | null;
  month: number | null;
  day: number | null;
}

const BirthDateField = ({ control }: { control: Control<IFormValue> }) => {
  // // useController로 year, month, day 값 가져오기
  // const { field: yearField } = useController({ name: "year", control });
  // const { field: monthField } = useController({ name: "month", control });
  // const { field: dayField } = useController({ name: "day", control });

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
