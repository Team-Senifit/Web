"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const PhoneCallIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"38"}
    height={"38"}
    viewBox={"0 0 38 38"}
    fill={"none"}
  >
    <path
      d={
        "M20.6663 2.33203C24.6446 2.33203 28.4599 3.91238 31.2729 6.72543C34.086 9.53847 35.6663 13.3538 35.6663 17.332M20.6663 8.9987C22.8765 8.9987 24.9961 9.87667 26.5589 11.4395C28.1217 13.0023 28.9997 15.1219 28.9997 17.332M22.053 26.612C22.3972 26.7701 22.785 26.8062 23.1525 26.7144C23.52 26.6226 23.8452 26.4084 24.0747 26.107L24.6663 25.332C24.9768 24.918 25.3794 24.582 25.8423 24.3506C26.3051 24.1192 26.8155 23.9987 27.333 23.9987H32.333C33.2171 23.9987 34.0649 24.3499 34.69 24.975C35.3152 25.6001 35.6663 26.448 35.6663 27.332V32.332C35.6663 33.2161 35.3152 34.0639 34.69 34.6891C34.0649 35.3142 33.2171 35.6654 32.333 35.6654C24.3765 35.6654 16.7459 32.5047 11.1198 26.8786C5.49371 21.2525 2.33301 13.6219 2.33301 5.66536C2.33301 4.78131 2.6842 3.93346 3.30932 3.30834C3.93444 2.68322 4.78229 2.33203 5.66634 2.33203H10.6663C11.5504 2.33203 12.3982 2.68322 13.0234 3.30834C13.6485 3.93346 13.9997 4.78131 13.9997 5.66536V10.6654C13.9997 11.1828 13.8792 11.6932 13.6478 12.1561C13.4163 12.6189 13.0803 13.0215 12.6663 13.332L11.8863 13.917C11.5804 14.1507 11.3647 14.483 11.276 14.8576C11.1873 15.2322 11.231 15.626 11.3997 15.972C13.6775 20.5985 17.4237 24.34 22.053 26.612Z"
      }
      stroke={"currentColor"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "PhoneCallIconBase",
);

export type PhoneCallIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const PhoneCallIcon = React.forwardRef<SVGSVGElement, PhoneCallIconProps>(
  ({ strokeWidth = 1.5, sx, ...rest }, ref) => (
    <PhoneCallIconBase
      ref={ref}
      sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
      {...rest}
    />
  ),
);

PhoneCallIcon.displayName = "PhoneCallIcon";

export default PhoneCallIcon;
