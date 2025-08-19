import { Stack } from "@mui/material";
import React from "react";
import SenifitTextField from "../../../../../../components/SenifitTextField";
import { Control } from "react-hook-form";
import { IMemberEditFormValue } from "@/types/IMemberEdit";

const BirthDateField = ({
  age,
  control,
}: {
  age: number;
  control: Control<IMemberEditFormValue>;
}) => {
  return (
    <Stack direction={"row"} spacing={1.5} alignItems="center">
      {`만 ${age}세`}
      <Stack direction={"row"} spacing={2} alignItems="center">
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
      </Stack>
    </Stack>
  );
};

export default BirthDateField;
