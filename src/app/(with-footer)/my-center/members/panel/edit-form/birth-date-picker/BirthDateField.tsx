import { Stack, Typography } from "@mui/material";
import React from "react";
import SenifitTextField from "../../../../../../../components/SenifitTextField";
import { Control } from "react-hook-form";
import { IMemberEditFormValue } from "@/types/IMember";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      {children}
      <Typography variant={"Heading1"} sx={{ color: "label.neutral" }}>
        {label}
      </Typography>
    </Stack>
  );
};

const BirthDateField = ({
  isSolar,
  age,
  control,
}: {
  isSolar: boolean;
  age: number;
  control: Control<IMemberEditFormValue>;
}) => {
  return (
    <Stack
      direction={["column", "row"]}
      gap={[1.5, 4]}
      alignItems={["flex-start", "center"]}
    >
      <Typography variant={"Heading1"} sx={{ color: "label.normal" }}>
        {"만 "}
        <Typography
          variant={"Heading1"}
          component={"span"}
          sx={{ color: "primary.main" }}
        >
          {age}
        </Typography>
        {"세"}

        <Typography
          variant={"Heading1"}
          component={"span"}
          sx={{ color: "primary.main" }}
        >
          {isSolar ? " (양력)" : " (음력)"}
        </Typography>
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <Field label={"년"}>
          <SenifitTextField
            control={control}
            name={"year"}
            placeholder={"생년"}
            rules={{
              required: "생년을 입력해주세요.",
            }}
            sx={{
              width: "4.25rem",
            }}
          />
        </Field>
        <Field label={"월"}>
          <SenifitTextField
            control={control}
            name={"month"}
            placeholder={"생월"}
            rules={{
              required: "생월을 입력해주세요.",
            }}
            sx={{
              width: "3.5rem",
            }}
          />
        </Field>
        <Field label={"일"}>
          <SenifitTextField
            control={control}
            name={"day"}
            placeholder={"생일"}
            rules={{
              required: "생일을 입력해주세요.",
            }}
            sx={{
              width: "3.5rem",
            }}
          />
        </Field>
      </Stack>
    </Stack>
  );
};

export default BirthDateField;
