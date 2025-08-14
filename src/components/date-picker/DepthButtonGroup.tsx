import React, { useState } from "react";
import SenifitRadioButtonGroup from "../SenifitRadioButtonGroup";
import SenifitToggleButtonGroup, {
  ISenifitToggleOption,
} from "../SenifitToggleButtonGroup";

export type Depth = "year" | "month" | "day";

const DepthButtonGroup = ({
  depth,
  setDepth,
  year,
  month,
  day,
}: {
  depth: Depth | null;
  setDepth: (depth: Depth | null) => void;
  year?: number;
  month?: number;
  day?: number;
}) => {
  const options = [
    { value: "year", label: "연도" },
    { value: "month", label: "월" },
    { value: "day", label: "일" },
  ] as ISenifitToggleOption<Depth>[];

  return (
    <SenifitToggleButtonGroup<Depth>
      value={depth}
      onChange={(v: Depth) => setDepth(v)}
      exclusive
      options={options}
    />
  );
};

export default DepthButtonGroup;
