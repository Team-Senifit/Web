"use client";

import CheckIcon from "@/components/icons/CheckIcon";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

const PARTS = ["어깨", "팔", "등", "다리", "배"] as const;

type DiscomfortSelectorProps = {
  label?: string;
  hasDiscomfort?: "none" | "yes";
  parts?: string[];
  onChange?: (payload: {
    hasDiscomfort: "none" | "yes";
    parts: string[];
  }) => void;
};

export default function TargetSelector({
  label,
  hasDiscomfort = "none",
  parts = [],
  onChange,
}: DiscomfortSelectorProps) {
  // 체크가 하나라도 있으면 자동으로 "있음" 버튼이 선택되도록
  const computedHas = useMemo<"none" | "yes">(
    () => (parts.length > 0 ? "yes" : hasDiscomfort),
    [hasDiscomfort, parts.length],
  );

  const setHas = (v: "none" | "yes") => {
    if (v === "none") onChange?.({ hasDiscomfort: "none", parts: [] });
    else onChange?.({ hasDiscomfort: "yes", parts });
  };

  const togglePart = (p: string) => {
    const next = parts.includes(p)
      ? parts.filter((x) => x !== p)
      : [...parts, p];
    onChange?.({
      hasDiscomfort: next.length > 0 ? "yes" : "none",
      parts: next,
    });
  };

  // 체크박스 아이콘
  const UncheckedBox = (
    <Box
      sx={(t) => ({
        width: "24px",
        height: "24px",
        padding: "3px",
        borderRadius: "6px",
        border: `1.5px solid ${t.palette.divider}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: t.palette.interaction.disabled,
      })}
    >
      <CheckIcon active={false} />
    </Box>
  );

  const CheckedBox = (
    <Box
      sx={(t) => ({
        width: "24px",
        height: "24px",
        padding: "3px",
        borderRadius: "6px",
        border: `1.5px solid ${t.palette.divider}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: t.palette.primary.main,
      })}
    >
      <CheckIcon active={true} />
    </Box>
  );

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
              <Radio value={"none"} />
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
              <Radio value={"yes"} />
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
                    <Checkbox
                      checked={checked}
                      icon={UncheckedBox}
                      checkedIcon={CheckedBox}
                      sx={{ p: 0, mr: "4px" }}
                    />
                  }
                  label={<Typography variant={"Label1"}>{p}</Typography>}
                  sx={{ m: 0 }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </FormControl>
  );
}
