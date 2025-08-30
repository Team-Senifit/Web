"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CircleQuestionMarkIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"38"}
    height={"38"}
    viewBox={"0 0 38 38"}
    fill={"none"}
  >
    <path
      d={
        "M19.0007 35.6673C28.2054 35.6673 35.6673 28.2054 35.6673 19.0007C35.6673 9.7959 28.2054 2.33398 19.0007 2.33398C9.7959 2.33398 2.33398 9.7959 2.33398 19.0007C2.33398 28.2054 9.7959 35.6673 19.0007 35.6673Z"
      }
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "CircleQuestionMarkIconBase",
);

export type CircleQuestionMarkIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const CircleQuestionMarkIcon = React.forwardRef<
  SVGSVGElement,
  CircleQuestionMarkIconProps
>(({ strokeWidth = 1.5, sx, ...rest }, ref) => (
  <CircleQuestionMarkIconBase
    ref={ref}
    sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
    {...rest}
  />
));

CircleQuestionMarkIcon.displayName = "CircleQuestionMarkIcon";

export default CircleQuestionMarkIcon;
