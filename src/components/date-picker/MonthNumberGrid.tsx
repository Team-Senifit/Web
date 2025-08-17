"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, SxProps, Typography } from "@mui/material";
import useMedia from "@/hooks/useMedia";

type MonthNumberGridProps = {
  year: number; // 2025
  month: number; // 1~12
  day: number | null;
  value?: Dayjs | null; // 선택된 날짜
  onChange?: (date: Dayjs) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disablePast?: boolean;
  disableFuture?: boolean;
  shouldDisableDate?: (day: Dayjs) => boolean;
  sx?: SxProps; // 컨테이너 스타일 확장
  daySx?: SxProps; // 일(버튼) 스타일 확장
};

const baseDaySx: SxProps = {
  width: "100%",
  height: "3.5rem",
  minWidth: 0,
  borderRadius: "5rem",
  borderWidth: 2,
  borderStyle: "solid",
  boxSizing: "border-box",
  color: "interaction.inactive",
  borderColor: "borderVariants.normal",
  backgroundColor: "bg.alternative",
  textTransform: "none",
  "&:hover": {
    borderColor: "primary.main",
    backgroundColor: "fillVariants.colored",
    color: "primary.main",
  },
  '&[data-selected="true"]': {
    color: "primary.main",
    borderColor: "primary.main",
    backgroundColor: "fillVariants.colored",
    "&:hover": { backgroundColor: "fillVariants.colored" },
  },
  "&.Mui-disabled": {
    opacity: 0.4,
  },
};

export function MonthNumberGrid({
  year,
  month, // 1~12
  day,
  value,
  onChange,
  minDate,
  maxDate,
  disablePast,
  disableFuture,
  shouldDisableDate,
  sx,
  daySx,
}: MonthNumberGridProps) {
  const { isPhone } = useMedia();

  const monthStart = dayjs().year(year).month(month).date(1);
  const today = dayjs().startOf("day");
  const daysInMonth = monthStart.daysInMonth();

  const isDisabled = (d: Dayjs) => {
    if (minDate && d.isBefore(minDate, "day")) return true;
    if (maxDate && d.isAfter(maxDate, "day")) return true;
    if (disablePast && d.isBefore(today, "day")) return true;
    if (disableFuture && d.isAfter(today, "day")) return true;
    if (shouldDisableDate?.(d)) return true;
    return false;
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
        gap: 1, // theme.spacing(1)
        p: 1.5,
        ...sx,
      }}
    >
      {Array.from({ length: daysInMonth }, (_, i) => {
        const dayNum = i + 1;
        const date = monthStart.date(dayNum);
        const selected = day ? date.isSame(day, "day") : false;

        return (
          <Button
            key={dayNum}
            onClick={() => onChange?.(date)}
            disabled={isDisabled(date)}
            data-selected={selected ? "true" : undefined}
            sx={{ ...baseDaySx, ...daySx } as SxProps}
          >
            <Typography variant={isPhone ? "Headline1" : "Heading2"}>
              {dayNum}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
}
