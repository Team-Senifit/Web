"use client";

import * as React from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IExclusiveProps,
  IMultiProps,
  ISenifitToggleButtonGroupRootProps,
} from "@/types/IToggleButton";

/** ───────────────── Styled primitives ───────────────── */

export type SizeVariant = "sm" | "md" | "lg";
const HEIGHT_PX: Record<SizeVariant, number> = { sm: 40, md: 56, lg: 64 };

export interface ISenifitToggleButtonProps extends ToggleButtonProps {
  sizeVariant?: SizeVariant;
  fullWidth?: boolean;
}

const SenifitToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== "sizeVariant" && prop !== "fullWidth",
})<ISenifitToggleButtonProps>(({ theme, sizeVariant = "md", fullWidth }) => {
  const h = HEIGHT_PX[sizeVariant];

  const inactive =
    (theme.palette as any)?.interaction?.inactive ??
    theme.palette.text.secondary;
  const borderNormal =
    (theme.palette as any)?.borderVariants?.normal ?? theme.palette.divider;
  const bgAlt =
    (theme.palette as any)?.bg?.alternative ?? theme.palette.action.hover;
  const selectedBg =
    (theme.palette as any)?.fillVariants?.colored ??
    theme.palette.action.selected;
  const selectedColor = theme.palette.primary.main;

  return {
    "&.MuiButtonBase-root": {
      height: h,
      maxHeight: h,
      minHeight: h,
      flex: 1,
      color: inactive,
      borderRadius: "0.75rem",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: borderNormal,
      backgroundColor: bgAlt,
      textTransform: "none",
      // display: "inline-flex",
      // alignItems: "center",
      // justifyContent: "center",

      "&:hover": {
        borderColor: selectedColor,
        backgroundColor: selectedBg,
        color: selectedColor,
      },
      "&.Mui-selected": {
        color: selectedColor,
        borderColor: selectedColor,
        backgroundColor: selectedBg,
        "&:hover": { backgroundColor: selectedBg },
      },
    },
  };
});

const SenifitToggleButtonGroupRoot = styled(ToggleButtonGroup, {
  shouldForwardProp: (prop) =>
    prop !== "gap" && prop !== "paddingX" && prop !== "paddingTop",
})<ISenifitToggleButtonGroupRootProps>(({ theme, gap = 1.25 }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(gap),
  w: 1,
  "& .MuiToggleButtonGroup-grouped": { margin: 0, border: 0 },
}));

export function SenifitToggleButtonGroup<T extends string | number>(
  props: IExclusiveProps<T> | IMultiProps<T>
) {
  const {
    options,
    sizeVariant = "md",
    fullWidth = true,
    groupProps,
    buttonProps,
  } = props;

  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: any) => {
    if (props.exclusive === false) {
      props.onChange(Array.isArray(newValue) ? (newValue as T[]) : []);
    } else {
      if (newValue !== null && newValue !== undefined) {
        props.onChange(newValue as T);
      }
    }
  };

  return (
    <SenifitToggleButtonGroupRoot
      {...groupProps}
      value={props.value as any}
      exclusive={props.exclusive !== false}
      onChange={handleChange}
    >
      {options.map(({ value, label, disabled, buttonProps: perBtn }) => (
        <SenifitToggleButton
          key={String(value)}
          value={value}
          sizeVariant={sizeVariant}
          fullWidth={fullWidth}
          disabled={disabled}
          {...buttonProps}
          {...perBtn}
        >
          {label}
        </SenifitToggleButton>
      ))}
    </SenifitToggleButtonGroupRoot>
  );
}

export default SenifitToggleButtonGroup;
