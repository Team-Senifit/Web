"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CheckIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
  >
    <path
      d={"M20 6L9 17L4 12"}
      stroke={"currentColor"}
      stroke-linecap={"round"}
      stroke-linejoin={"round"}
    />
  </svg>,
  "CheckIconBase",
);

export type CheckIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const CheckIcon = React.forwardRef<SVGSVGElement, CheckIconProps>(
  ({ strokeWidth = 1.5, sx, ...rest }, ref) => (
    <CheckIconBase
      ref={ref}
      sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
      {...rest}
    />
  ),
);

CheckIcon.displayName = "CheckIcon";

export default CheckIcon;
