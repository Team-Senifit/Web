"use client";

import React from "react";
import {
  IconButton,
  Stack,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ChevronIconStyle: SxProps<Theme> = {
  width: "1.5rem",
  height: "1.5rem",
  color: "label.strong",
};

const CalendarTitle = ({
  title,
  leftAriaLabel,
  rightAriaLabel,
  onLeftArrowClick,
  onRightArrowClick,
  prevDisabled,
  nextDisabled,
}: {
  title: string;
  leftAriaLabel: string;
  rightAriaLabel: string;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
}) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{ py: 1, px: 3 }}
    >
      <IconButton
        aria-label={leftAriaLabel}
        onClick={onLeftArrowClick}
        disabled={prevDisabled}
        sx={ChevronIconStyle}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Typography variant={"Headline1"}>{title}</Typography>

      <IconButton
        aria-label={rightAriaLabel}
        onClick={onRightArrowClick}
        disabled={nextDisabled}
        sx={ChevronIconStyle}
      >
        <ChevronRightIcon />
      </IconButton>
    </Stack>
  );
};

export default CalendarTitle;
