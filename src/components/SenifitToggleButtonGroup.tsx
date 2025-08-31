/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  IExclusiveProps,
  IMultiProps,
  SizeVariant,
  IResponsiveMaxItems,
} from "@/types/IToggleButton";

/** ───────────────── Styled primitives ───────────────── */

const HEIGHT_PX: Record<SizeVariant, number> = { sm: 40, md: 56, lg: 64 };

export interface ISenifitToggleButtonProps {
  sizeVariant?: SizeVariant;
  fullWidth?: boolean;
  selected?: boolean;
}

const SenifitToggleButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "sizeVariant" && prop !== "fullWidth" && prop !== "selected",
})<ISenifitToggleButtonProps>(({
  theme,
  sizeVariant = "md",
  fullWidth,
  selected,
}) => {
  const h = HEIGHT_PX[sizeVariant];

  const inactive =
    (theme.palette as any)?.interaction?.inactive ??
    theme.palette.text.secondary;
  const borderNormal =
    (theme.palette as any)?.borderVariants?.normal ?? theme.palette.divider;
  const bgAlt =
    (theme.palette as any)?.fillVariants?.alternative ??
    theme.palette.action.hover;
  const selectedBg =
    (theme.palette as any)?.fillVariants?.colored ??
    theme.palette.action.selected;
  const selectedColor = theme.palette.primary.main;

  return {
    height: h,
    maxHeight: h,
    minHeight: h,
    color: selected ? selectedColor : inactive,
    borderRadius: "0.75rem",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: selected ? selectedColor : borderNormal,
    backgroundColor: selected ? selectedBg : bgAlt,
    textTransform: "none",
    flex: fullWidth ? "1 1 0" : "0 0 auto",
    minWidth: fullWidth ? 0 : "auto",
    "&:hover": {
      borderColor: selectedColor,
      backgroundColor: selectedBg,
      color: selectedColor,
    },
  };
});

const GridContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "gap" && prop !== "maxItemsPerRow",
})<{
  gap: number;
  maxItemsPerRow?: number | IResponsiveMaxItems;
}>(({ theme, gap, maxItemsPerRow }) => {
  let gridTemplateColumns: string;

  if (typeof maxItemsPerRow === "number") {
    // 숫자인 경우: 모든 브레이크포인트에서 동일
    gridTemplateColumns = `repeat(${maxItemsPerRow}, 1fr)`;
  } else if (maxItemsPerRow && typeof maxItemsPerRow === "object") {
    // 객체인 경우: 반응형 처리
    const { phone, tablet, desktop } = maxItemsPerRow;
    const phoneColumns = phone
      ? `repeat(${phone}, 1fr)`
      : "repeat(auto-fit, minmax(120px, 1fr))";
    const tabletColumns = tablet ? `repeat(${tablet}, 1fr)` : phoneColumns;
    const desktopColumns = desktop ? `repeat(${desktop}, 1fr)` : tabletColumns;

    return {
      display: "grid",
      gap: theme.spacing(gap),
      width: "100%",
      gridTemplateColumns: phoneColumns,
      [theme.breakpoints.up("tablet")]: {
        gridTemplateColumns: tabletColumns,
      },
      [theme.breakpoints.up("desktop")]: {
        gridTemplateColumns: desktopColumns,
      },
    };
  } else {
    // 기본값: 자동 반응형
    gridTemplateColumns = "repeat(auto-fit, minmax(120px, 1fr))";
  }

  return {
    display: "grid",
    gridTemplateColumns,
    gap: theme.spacing(gap),
    width: "100%",
  };
});

function SenifitToggleButtonGroup<T extends string | number | boolean>(
  props: IExclusiveProps<T> | IMultiProps<T>,
) {
  const {
    options,
    sizeVariant = "md",
    fullWidth = false,
    maxItemsPerRow,
    groupProps,
    buttonProps,
  } = props;

  const isSelected = React.useCallback(
    (optionValue: T): boolean => {
      if (props.exclusive === false) {
        return Array.isArray(props.value) && props.value.includes(optionValue);
      } else {
        return props.value === optionValue;
      }
    },
    [props.value, props.exclusive],
  );

  const handleButtonClick = React.useCallback(
    (optionValue: T) => () => {
      if (props.exclusive === false) {
        // 다중 선택 모드
        const currentValues = Array.isArray(props.value) ? props.value : [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter((v) => v !== optionValue)
          : [...currentValues, optionValue];
        props.onChange(newValues);
      } else {
        // 단일 선택 모드
        if (props.value === optionValue) {
          // 이미 선택된 버튼을 클릭하면 선택 해제 (필요에 따라 제거 가능)
          return;
        }
        props.onChange(optionValue);
      }
    },
    [props],
  );

  const { gap = 2, ...restGroupProps } = groupProps || {};

  return (
    <GridContainer
      gap={gap}
      maxItemsPerRow={maxItemsPerRow}
      {...restGroupProps}
    >
      {options.map(({ value, label, disabled, buttonProps: perBtn }) => {
        const { ...restPerBtn } = perBtn || {};

        const { ...restButtonProps } = buttonProps || {};

        return (
          <SenifitToggleButton
            key={String(value)}
            sizeVariant={sizeVariant}
            fullWidth={fullWidth}
            selected={isSelected(value)}
            disabled={disabled}
            onClick={!disabled ? handleButtonClick(value) : undefined}
            {...restButtonProps}
            {...restPerBtn}
          >
            {label}
          </SenifitToggleButton>
        );
      })}
    </GridContainer>
  );
}

export default SenifitToggleButtonGroup;
