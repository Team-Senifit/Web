"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const CircleCheckBigIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"40"}
    height={"40"}
    viewBox={"0 0 40 40"}
    fill={"none"}
  >
    <path
      d={
        "M36.3357 16.6671C37.0968 20.4026 36.5544 24.2862 34.7987 27.6701C33.0431 31.0541 30.1805 33.7339 26.6882 35.2627C23.1959 36.7914 19.285 37.0768 15.6078 36.0711C11.9306 35.0654 8.70931 32.8295 6.48111 29.7362C4.25292 26.6429 3.15252 22.8792 3.36343 19.0728C3.57433 15.2664 5.08379 11.6473 7.64007 8.81909C10.1964 5.99089 13.645 4.12452 17.4108 3.53123C21.1766 2.93793 25.032 3.65357 28.334 5.5588"
      }
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
    <path
      d={"M15 18.3346L20 23.3346L36.6667 6.66797"}
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "CircleCheckBigIconBase",
);

export type CircleCheckBigIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const CircleCheckBigIcon = React.forwardRef<
  SVGSVGElement,
  CircleCheckBigIconProps
>(({ strokeWidth = 1.5, sx, ...rest }, ref) => (
  <CircleCheckBigIconBase
    ref={ref}
    sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
    {...rest}
  />
));

CircleCheckBigIcon.displayName = "CircleCheckBigIcon";

export default CircleCheckBigIcon;
