"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const UndoIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"24"}
    height={"25"}
    viewBox={"0 0 24 25"}
    fill={"none"}
  >
    <path
      d={"M9 14.5L4 9.5L9 4.5"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
    <path
      d={
        "M4 9.5H14.5C15.2223 9.5 15.9375 9.64226 16.6048 9.91866C17.272 10.1951 17.8784 10.6002 18.3891 11.1109C18.8998 11.6216 19.3049 12.228 19.5813 12.8952C19.8577 13.5625 20 14.2777 20 15C20 15.7223 19.8577 16.4375 19.5813 17.1048C19.3049 17.772 18.8998 18.3784 18.3891 18.8891C17.8784 19.3998 17.272 19.8049 16.6048 20.0813C15.9375 20.3577 15.2223 20.5 14.5 20.5H11"
      }
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "UndoIconBase",
);

export type UndoIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const UndoIcon = React.forwardRef<SVGSVGElement, UndoIconProps>(
  ({ strokeWidth = 1.5, sx, ...rest }, ref) => (
    <UndoIconBase
      ref={ref}
      sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
      {...rest}
    />
  ),
);

UndoIcon.displayName = "UndoIcon";

export default UndoIcon;
