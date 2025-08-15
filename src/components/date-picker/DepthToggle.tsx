"use client";

import React, { useState } from "react";
import SenifitToggleButtonGroup from "../SenifitToggleButtonGroup";
import { Box, Typography } from "@mui/material";
import useMedia from "@/hooks/useMedia";
import { ISenifitToggleOption } from "@/types/IToggleButton";

export type Depth = "year" | "month" | "day";

const DepthLabel = ({
  text,
  variant,
}: {
  text: string;
  variant: "Headline1" | "Heading2";
}) => <Typography variant={variant}>{text}</Typography>;

const DepthToggle = ({
  depth,
  setDepth,
  year,
  month,
  day,
}: {
  depth: Depth | null;
  setDepth: (depth: Depth | null) => void;
  year: number;
  month: number;
  day: number;
}) => {
  const { isPhone } = useMedia();

  const textVariant = isPhone ? "Headline1" : "Heading2";

  const options = [
    {
      value: "year",
      label: (
        <DepthLabel
          text={year > 0 ? `${year}년` : "생년"}
          variant={textVariant}
        />
      ),
    },
    {
      value: "month",
      label: (
        <DepthLabel
          text={month > 0 ? `${month}월` : "생월"}
          variant={textVariant}
        />
      ),
    },
    {
      value: "day",
      label: (
        <DepthLabel
          text={day > 0 ? `${day}일` : "생일"}
          variant={textVariant}
        />
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
        value={depth}
        onChange={(v: Depth) => setDepth(v)}
        exclusive
        options={options}
      />
    </Box>
  );
};

export default DepthToggle;
