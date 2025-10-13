"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const EyeOffIconBase = createSvgIcon(
  <svg xmlns={"http://www.w3.org/2000/svg"} fill={"none"}>
    <g clipPath={"url(#clip0_1784_83)"}>
      <path
        d={
          "M8.94417 4.23016C10.8853 3.99883 12.8488 4.40917 14.5349 5.39853C16.2209 6.38789 17.5369 7.90189 18.2817 9.70932C18.3511 9.89642 18.3511 10.1022 18.2817 10.2893C17.9749 11.0316 17.5702 11.7294 17.0783 12.3643M11.7367 11.7985C11.2652 12.2539 10.6337 12.5059 9.97817 12.5002C9.32268 12.4945 8.69565 12.2316 8.23213 11.768C7.76861 11.3045 7.50568 10.6775 7.49999 10.022C7.49429 9.3665 7.74628 8.735 8.20167 8.26349"
        }
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
      <path
        d={
          "M14.5658 14.5826C13.4604 15.2374 12.2271 15.6468 10.9495 15.7829C9.67188 15.9191 8.37996 15.7788 7.16136 15.3717C5.94276 14.9645 4.82599 14.3 3.88684 13.4232C2.94769 12.5464 2.20813 11.4779 1.71833 10.2901C1.64888 10.103 1.64888 9.89718 1.71833 9.71008C2.45719 7.91829 3.75723 6.41445 5.42333 5.42425M1.66667 1.66675L18.3333 18.3334"
        }
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
      />
    </g>
    <defs>
      <clipPath id={"clip0_1784_83"}>
        <rect width={"20"} height={"20"} fill={"white"} />
      </clipPath>
    </defs>
  </svg>,
  "EyeOffIconBase",
);

export type EyeOffIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const EyeOffIcon = React.forwardRef<SVGSVGElement, EyeOffIconProps>(
  ({ strokeWidth = 1.5, sx, ...rest }, ref) => (
    <EyeOffIconBase
      ref={ref}
      sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
      {...rest}
    />
  ),
);

EyeOffIcon.displayName = "EyeOffIcon";

export default EyeOffIcon;
