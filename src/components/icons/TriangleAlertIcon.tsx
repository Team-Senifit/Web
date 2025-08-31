"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const TriangleAlertIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"38"}
    height={"34"}
    viewBox={"0 0 38 34"}
    fill={"none"}
  >
    <path
      d={
        "M18.9994 11.9997V18.6664M18.9994 25.3331H19.0161M35.2161 26.9997L21.8827 3.66639C21.592 3.1534 21.1704 2.7267 20.6609 2.42984C20.1515 2.13297 19.5724 1.97656 18.9827 1.97656C18.3931 1.97656 17.814 2.13297 17.3045 2.42984C16.7951 2.7267 16.3735 3.1534 16.0827 3.66639L2.74939 26.9997C2.45553 27.5087 2.30144 28.0862 2.30274 28.6739C2.30404 29.2616 2.46069 29.8385 2.7568 30.3461C3.05292 30.8537 3.47797 31.274 3.98889 31.5644C4.4998 31.8548 5.07841 32.005 5.66606 31.9997H32.3327C32.9176 31.9991 33.4919 31.8447 33.9982 31.5519C34.5044 31.2591 34.9248 30.8382 35.2169 30.3316C35.5091 29.825 35.6628 29.2504 35.6626 28.6655C35.6625 28.0807 35.5085 27.5062 35.2161 26.9997Z"
      }
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "TriangleAlertIconBase",
);

export type TriangleAlertIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const TriangleAlertIcon = React.forwardRef<
  SVGSVGElement,
  TriangleAlertIconProps
>(({ strokeWidth = 1.5, sx, ...rest }, ref) => (
  <TriangleAlertIconBase
    ref={ref}
    sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
    {...rest}
  />
));

TriangleAlertIcon.displayName = "TriangleAlertIcon";

export default TriangleAlertIcon;
