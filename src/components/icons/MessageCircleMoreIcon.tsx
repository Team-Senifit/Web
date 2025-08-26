"use client";
import * as React from "react";
import { createSvgIcon } from "@mui/material/utils";
import type { SvgIconProps } from "@mui/material/SvgIcon";

const MessageCircleMoreIconBase = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      d="M13.3332 20.0001H13.3499M19.9999 20.0001H20.0166M26.6666 20.0001H26.6832M4.98656 27.2368C5.23162 27.855 5.28618 28.5324 5.14323 29.1818L3.36823 34.6651C3.31103 34.9432 3.32582 35.2313 3.41118 35.5021C3.49655 35.7728 3.64966 36.0173 3.856 36.2123C4.06234 36.4073 4.31507 36.5463 4.59022 36.6162C4.86538 36.6861 5.15383 36.6846 5.42823 36.6118L11.1166 34.9485C11.7294 34.8269 12.3641 34.88 12.9482 35.1018C16.5072 36.7638 20.5388 37.1155 24.3318 36.0947C28.1248 35.0739 31.4353 32.7462 33.6794 29.5224C35.9234 26.2986 36.9568 22.3858 36.5971 18.4744C36.2373 14.563 34.5077 10.9043 31.7133 8.1438C28.919 5.38335 25.2394 3.69854 21.3239 3.38664C17.4083 3.07473 13.5085 4.15578 10.3123 6.43904C7.11614 8.7223 4.82911 12.061 3.85471 15.8662C2.88032 19.6714 3.28117 23.6984 4.98656 27.2368Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  "MessageCircleMoreIconBase"
);

export type MessageCircleMoreIconProps = SvgIconProps & {
  strokeWidth?: number | string;
};

const MessageCircleMoreIcon = React.forwardRef<
  SVGSVGElement,
  MessageCircleMoreIconProps
>(({ strokeWidth = 1.5, sx, ...rest }, ref) => (
  <MessageCircleMoreIconBase
    ref={ref}
    sx={{ ...sx, strokeWidth, "& *": { vectorEffect: "non-scaling-stroke" } }}
    {...rest}
  />
));

MessageCircleMoreIcon.displayName = "MessageCircleMoreIcon";

export default MessageCircleMoreIcon;
