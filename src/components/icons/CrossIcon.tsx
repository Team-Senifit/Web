"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CrossIconBase = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  "CrossIconBase"
);

export type CrossIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const CrossIcon = React.forwardRef<SVGSVGElement, CrossIconProps>(
  ({ strokeWidth = 1.5, sx, ...rest }, ref) => (
    <CrossIconBase
      ref={ref}
      sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
      {...rest}
    />
  )
);

CrossIcon.displayName = "CrossIcon";

export default CrossIcon;
