import { TextField } from "@mui/material";
import React from "react";
import SenifitTextField from "../SenifitTextField";
import { Control } from "react-hook-form";

interface IFormValue {
  year: number | null;
  month: number | null;
  day: number | null;
}

const BirthDateField = ({ control }: { control: Control<IFormValue> }) => {
  return (
    <SenifitTextField
      control={control}
      name="year"
      placeholder="생년"
      autoComplete="off"
    />
  );
};

export default BirthDateField;
