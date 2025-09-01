"use client";

import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const BackIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
  >
    <path
      d={"M9 14L4 9L9 4"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
    <path
      d={
        "M4 9H14.5C15.2223 9 15.9375 9.14226 16.6048 9.41866C17.272 9.69506 17.8784 10.1002 18.3891 10.6109C18.8998 11.1216 19.3049 11.728 19.5813 12.3952C19.8577 13.0625 20 13.7777 20 14.5C20 15.2223 19.8577 15.9375 19.5813 16.6048C19.3049 17.272 18.8998 17.8784 18.3891 18.3891C17.8784 18.8998 17.272 19.3049 16.6048 19.5813C15.9375 19.8577 15.2223 20 14.5 20H11"
      }
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "BackIconBase",
);

export type BackIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const BackIcon = React.forwardRef<SVGSVGElement, BackIconProps>(
  ({ strokeWidth = 2, sx, ...rest }, ref) => (
    <BackIconBase
      ref={ref}
      sx={{
        ...sx,
        strokeWidth,
        "& *": { vectorEffect: "non-scaling-stroke" },
        color: (t) => t.palette.text.secondary,
      }}
      {...rest}
    />
  ),
);

BackIcon.displayName = "BackIcon";

export default BackIcon;
