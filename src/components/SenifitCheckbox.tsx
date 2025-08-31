// components/SenifitCheckbox.tsx
"use client";

import { forwardRef } from "react";
import {
  Checkbox as MuiCheckbox,
  type CheckboxProps,
  Box,
  SvgIcon,
  type SvgIconProps,
} from "@mui/material";

import { CheckIcon } from "./icons";

// indeterminate(—) 아이콘
function MinusIcon({ ...rest }: SvgIconProps) {
  return (
    <SvgIcon viewBox={"0 0 24 24"} {...rest}>
      <path
        d={"M6 12h12"}
        fill={"none"}
        stroke={"currentColor"}
        strokeWidth={4}
        strokeLinecap={"round"}
      />
    </SvgIcon>
  );
}

const baseBoxSx = {
  width: "2rem",
  height: "2rem",
  borderRadius: "0.5rem",
  p: 0.5,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

const Unchecked = (
  <Box
    component={"span"}
    sx={{ ...baseBoxSx, bgcolor: "interaction.disabled" }}
  >
    <CheckIcon strokeWidth={4} sx={{ color: "label.disabled" }} />
  </Box>
);

const Checked = (
  <Box component={"span"} sx={{ ...baseBoxSx, bgcolor: "primary.main" }}>
    <CheckIcon strokeWidth={4} sx={{ color: "static.white" }} />
  </Box>
);

const Indeterminate = (
  <Box component={"span"} sx={{ ...baseBoxSx, bgcolor: "primary.main" }}>
    <MinusIcon strokeWidth={4} sx={{ color: "static.white" }} />
  </Box>
);

export type SenifitCheckboxProps = Omit<
  CheckboxProps,
  "icon" | "checkedIcon" | "indeterminateIcon"
> & {
  // 필요하면 여기서 커스텀 prop 확장 가능
};

const SenifitCheckbox = forwardRef<HTMLButtonElement, SenifitCheckboxProps>(
  function SenifitCheckbox({ sx, ...props }, ref) {
    return (
      <MuiCheckbox
        ref={ref}
        sx={{ p: 0, ...sx }}
        icon={Unchecked}
        checkedIcon={Checked}
        indeterminateIcon={Indeterminate}
        {...props}
      />
    );
  },
);

export default SenifitCheckbox;
