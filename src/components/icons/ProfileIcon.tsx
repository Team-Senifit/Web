"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const ProfileIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
  >
    <path
      d={
        "M11.5 15.0001H7C5.93913 15.0001 4.92172 15.4216 4.17157 16.1717C3.42143 16.9219 3 17.9393 3 19.0001V21.0001M21.378 16.6261C21.7764 16.2278 22.0001 15.6875 22.0001 15.1241C22.0001 14.5608 21.7764 14.0205 21.378 13.6221C20.9796 13.2238 20.4394 13 19.876 13C19.3126 13 18.7724 13.2238 18.374 13.6221L14.364 17.6341C14.1262 17.8718 13.9522 18.1655 13.858 18.4881L13.021 21.3581C12.9959 21.4442 12.9944 21.5354 13.0166 21.6222C13.0389 21.7091 13.0841 21.7883 13.1474 21.8517C13.2108 21.9151 13.2901 21.9603 13.3769 21.9825C13.4637 22.0048 13.555 22.0032 13.641 21.9781L16.511 21.1411C16.8337 21.0469 17.1274 20.8729 17.365 20.6351L21.378 16.6261Z"
      }
      stroke={"currentColor"}
      strokeWidth={"2"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
    <path
      d={
        "M10 11C12.2091 11 14 9.20914 14 7C14 4.79086 12.2091 3 10 3C7.79086 3 6 4.79086 6 7C6 9.20914 7.79086 11 10 11Z"
      }
      stroke={"currentColor"}
      strokeWidth={"2"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "ProfileIconBase",
);

export type ProfileIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const ProfileIcon = React.forwardRef<SVGSVGElement, ProfileIconProps>(
  ({ strokeWidth = 2, sx, ...rest }, ref) => (
    <ProfileIconBase
      ref={ref}
      sx={{
        ...sx,
        strokeWidth,
        "& *": { vectorEffect: "non-scaling-stroke" },
      }}
      {...rest}
    />
  ),
);

ProfileIcon.displayName = "ProfileIcon";

export default ProfileIcon;
