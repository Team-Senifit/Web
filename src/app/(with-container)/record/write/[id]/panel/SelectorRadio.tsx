"use client";

import { FormControl, FormLabel, Radio, Typography, Box } from "@mui/material";
import { useId } from "react";

type SurveyScaleProps = {
  label?: string;
  value?: "veryGood" | "good" | "neutral" | "bad" | "veryBad";
  onChange?: (v: SurveyScaleProps["value"]) => void;
};

const OPTIONS = [
  { key: "veryGood", label: "매우 좋음" },
  { key: "good", label: "좋음" },
  { key: "neutral", label: "보통" },
  { key: "bad", label: "나쁨" },
  { key: "veryBad", label: "매우 나쁨" },
] as const;

export default function SurveyScale({
  label,
  value = "veryGood",
  onChange,
}: SurveyScaleProps) {
  const name = useId();
  return (
    <FormControl sx={{ width: "100%" }}>
      {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: "92px",
        }}
      >
        {OPTIONS.map((o) => (
          <Box
            key={o.key}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant={"Label1"}>{o.label}</Typography>
            <Radio
              checked={value === o.key}
              onChange={() => onChange?.(o.key as SurveyScaleProps["value"])}
              name={name}
              value={o.key}
            />
          </Box>
        ))}
      </Box>
    </FormControl>
  );
}
