"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const SurveyIconBase = createSvgIcon(
  <svg
    xmlns={"http://www.w3.org/2000/svg"}
    width={"24"}
    height={"24"}
    viewBox={"0 0 24 24"}
    fill={"none"}
  >
    <path
      d={
        "M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
      }
      stroke={"currentColor"}
      strokeWidth={"2"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
    <path
      d={
        "M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H12.5M4 13.5V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
      }
      stroke={"currentColor"}
      strokeWidth={"2"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
    <path
      d={
        "M13.378 15.6261C13.5752 15.4289 13.7317 15.1947 13.8384 14.937C13.9452 14.6793 14.0001 14.4031 14.0001 14.1241C14.0001 13.8452 13.9452 13.569 13.8384 13.3113C13.7317 13.0536 13.5752 12.8194 13.378 12.6221C13.1807 12.4249 12.9466 12.2684 12.6889 12.1617C12.4311 12.0549 12.1549 12 11.876 12C11.597 12 11.3208 12.0549 11.0631 12.1617C10.8054 12.2684 10.5712 12.4249 10.374 12.6221L5.36398 17.6341C5.12622 17.8718 4.9522 18.1655 4.85798 18.4881L4.02098 21.3581C3.99588 21.4442 3.99437 21.5354 4.01662 21.6222C4.03887 21.7091 4.08404 21.7883 4.14742 21.8517C4.2108 21.9151 4.29006 21.9603 4.37689 21.9825C4.46372 22.0048 4.55493 22.0032 4.64098 21.9781L7.51098 21.1411C7.83364 21.0469 8.12735 20.8729 8.36498 20.6351L13.378 15.6261Z"
      }
      stroke={"currentColor"}
      strokeWidth={"2"}
      strokeLinecap={"round"}
      strokeLinejoin={"round"}
    />
  </svg>,
  "SurveyIconBase",
);

export type SurveyIconProps = SvgIconProps & {
  strokeWidth?: number | string;
  active?: boolean;
};

const SurveyIcon = React.forwardRef<SVGSVGElement, SurveyIconProps>(
  ({ strokeWidth, active = false, sx, ...rest }, ref) => (
    <SurveyIconBase
      ref={ref}
      sx={{
        ...sx,
        strokeWidth,
        "& *": { vectorEffect: "non-scaling-stroke" },
        color: (t) =>
          active ? t.palette.primary.main : t.palette.common.white,
        fontSize: active ? 40 : 24,
      }}
      {...rest}
    />
  ),
);

SurveyIcon.displayName = "SurveyIcon";

export default SurveyIcon;
