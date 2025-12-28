"use client";

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import SenifitCheckbox from "@/components/SenifitCheckbox";

const PARTS = ["어깨", "팔", "등", "다리", "배"] as const;

type DiscomfortSelectorProps = {
  label?: string;
  hasDiscomfort?: "none" | "yes";
  parts?: string[];
  onChange?: (payload: {
    hasDiscomfort: "none" | "yes";
    parts: string[];
  }) => void;
  readOnly?: boolean;
};

export default function TargetSelector({
  label,
  hasDiscomfort = "none",
  parts = [],
  onChange,
  readOnly,
}: DiscomfortSelectorProps) {
  // 체크가 하나라도 있으면 자동으로 "있음" 버튼이 선택되도록
  const computedHas = useMemo<"none" | "yes">(
    () => (parts.length > 0 ? "yes" : hasDiscomfort),
    [hasDiscomfort, parts.length],
  );

  const setHas = (v: "none" | "yes") => {
    if (readOnly) return;
    if (v === "none") onChange?.({ hasDiscomfort: "none", parts: [] });
    else onChange?.({ hasDiscomfort: "yes", parts });
  };

  const togglePart = (p: string) => {
    if (readOnly) return;
    const next = parts.includes(p)
      ? parts.filter((x) => x !== p)
      : [...parts, p];
    onChange?.({
      hasDiscomfort: next.length > 0 ? "yes" : "none",
      parts: next,
    });
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "space-between",
          gap: "8px",
        }}
      >
        {/* 없음 있음 - RadioGroup */}
        <Box sx={{ flex: 1 }}>
          <RadioGroup
            value={computedHas}
            onChange={(e) => setHas(e.target.value as "none" | "yes")}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant={"Label1"} sx={{ mb: "8px" }}>
                {"없음"}
              </Typography>
              <Radio value={"none"} readOnly={readOnly} />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant={"Label1"} sx={{ mb: "8px" }}>
                {"있음"}
              </Typography>
              <Radio value={"yes"} readOnly={readOnly} />
            </Box>
          </RadioGroup>
        </Box>

        {/* 부위들 - 2열 배치 */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              rowGap: "10px",
              columnGap: "10px",
            }}
          >
            {PARTS.map((p) => {
              const checked = parts.includes(p);
              return (
                <FormControlLabel
                  key={p}
                  onChange={() => togglePart(p)}
                  control={
                    <SenifitCheckbox checked={checked} readOnly={readOnly} />
                  }
                  label={
                    <Typography variant={"Label1"} sx={{ ml: "4px" }}>
                      {p}
                    </Typography>
                  }
                  sx={{
                    m: 0,
                    "& .MuiFormControlLabel-label": { marginLeft: 0 },
                    ...(readOnly && { cursor: "default" }),
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </FormControl>
  );
}
