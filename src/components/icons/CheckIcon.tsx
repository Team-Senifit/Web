"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CheckIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"18"}
    height={"18"}
    viewBox={"0 0 18 18"}
    fill={"none"}
  >
    <path
      d={"M15 4.5L6.75 12.75L3 9"}
      stroke={"currentColor"}
      strokeWidth={"2"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "CheckIconBase",
);

export type CheckIconProps = SvgIconProps & {
  active?: boolean;
};

const CheckIcon = React.forwardRef<SVGSVGElement, CheckIconProps>(
  ({ active = false, sx, ...rest }, ref) => (
    <CheckIconBase
      ref={ref}
      sx={{
        ...sx,
        color: (t) =>
          active ? t.palette.common.white : t.palette.label.disabled,
      }}
      {...rest}
    />
  ),
);

CheckIcon.displayName = "CheckIcon";

export default CheckIcon;
