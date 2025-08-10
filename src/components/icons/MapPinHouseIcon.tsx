"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const MapPinHouseIconBase = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 14.993 7.539 20.193 9.399 21.799C9.57237 21.929 9.78329 21.9992 10 21.999M18 22V19M15 22C14.7348 22 14.4804 21.8946 14.2929 21.7071C14.1054 21.5196 14 21.2652 14 21V17C14 16.8354 14.0406 16.6734 14.1182 16.5282C14.1958 16.3831 14.3081 16.2593 14.445 16.168L17.445 14.168C17.6093 14.0584 17.8025 13.9999 18 13.9999C18.1975 13.9999 18.3907 14.0584 18.555 14.168L21.555 16.168C21.6919 16.2593 21.8042 16.3831 21.8818 16.5282C21.9594 16.6734 22 16.8354 22 17V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22H15Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  "MapPinHouseIconBase"
);

export type MapPinHouseIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const MapPinHouseIcon = React.forwardRef<SVGSVGElement, MapPinHouseIconProps>(
  ({ strokeWidth = 1.5, sx, ...rest }, ref) => (
    <MapPinHouseIconBase
      ref={ref}
      sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
      {...rest}
    />
  )
);

MapPinHouseIcon.displayName = "MapPinHouseIcon";

export default MapPinHouseIcon;
