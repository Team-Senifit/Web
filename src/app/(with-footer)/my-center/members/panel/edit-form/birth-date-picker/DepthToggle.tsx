"use client";

import React from "react";
import SenifitToggleButtonGroup from "@/components/SenifitToggleButtonGroup";
import { Box, Typography } from "@mui/material";
import useMedia from "@/hooks/useMedia";
import { ISenifitToggleOption } from "@/types/IToggleButton";
import { useToastStore } from "@/states/useToastStore";

export type Depth = "year" | "month" | "day";

const DepthLabel = ({
  text,
  variant,
}: {
  text: string;
  variant: "Headline1" | "Heading2";
}) => <Typography variant={variant}>{text}</Typography>;

const DepthToggle = ({
  depth = "year",
  setDepth,
  year,
  month,
  day,
}: {
  depth: Depth;
  setDepth: (depth: Depth) => void;
  year: number | null;
  month: number | null;
  day: number | null;
}) => {
  const { isPhone } = useMedia();

  const textVariant = isPhone ? "Headline1" : "Heading2";

  const { setToastOpen } = useToastStore();

  const options = [
    {
      value: "year",
      label: (
        <DepthLabel text={year ? `${year}년` : "생년"} variant={textVariant} />
      ),
    },
    {
      value: "month",
      label: (
        <DepthLabel
          text={month !== undefined ? `${month}월` : "생월"}
          variant={textVariant}
        />
      ),
    },
    {
      value: "day",
      label: (
        <DepthLabel text={day ? `${day}일` : "생일"} variant={textVariant} />
      ),
    },
  ] as ISenifitToggleOption<Depth>[];

  return (
    <Box
      sx={{
        pt: [1.5],
        px: [1.5],
      }}
    >
      <SenifitToggleButtonGroup<Depth>
        fullWidth
        value={depth}
        onChange={(depth: Depth) => {
          if (depth === "month" && !year) {
            setToastOpen({
              message: "생년을 먼저 선택해주세요.",
            });
            return;
          }
          if (depth === "day" && !year && !month) {
            setToastOpen({
              message: "생년 또는 생월을 먼저 선택해주세요.",
            });
            return;
          }
          setDepth(depth);
        }}
        exclusive
        options={options}
      />
    </Box>
  );
};

export default DepthToggle;
