import React from "react";
import KoLocalizationProvider from "./KoLocalizationProvider";
import { Box, IconButton, Stack, SxProps } from "@mui/material";
import { MonthCalendar } from "@mui/x-date-pickers";
import CalendarButton from "./CalendarButton";
import { Theme } from "@emotion/react";
import CalendarTitle from "./CalendarTitle";
import dayjs from "dayjs";

const MonthCalendarWidthYear = ({
  year,
  setYear,
  month,
  setMonth,
}: {
  year: number | null;
  setYear: (value: number | null) => void;
  month: number | null;
  setMonth: (value: number | null) => void;
}) => {
  if (year === null) return null;
  console.log("month", month);
  return (
    <Stack>
      <CalendarTitle
        title={`${year}년`}
        leftAriaLabel="이전 연도"
        rightAriaLabel="다음 연도"
        onLeftArrowClick={() => setYear(year - 1)}
        onRightArrowClick={() => setYear(year + 1)}
        prevDisabled={year === null || year <= 1900}
        nextDisabled={year === null || year >= 2099}
      />
      <KoLocalizationProvider>
        <Box
          sx={{
            "& .MuiMonthCalendar-root": {
              width: 1,
              display: "grid",
              gridTemplateColumns: `repeat(${3}, minmax(0, 1fr))`,
              p: 1.5,
              gap: 1,
            },
            "& .MuiPickersMonth-root": {
              display: "contents",
              minWidth: 0,
            },
            "& .MuiPickersMonth-monthButton": {
              width: "100%",
              boxSizing: "border-box",
            },
          }}
        >
          <MonthCalendar
            slots={{
              monthButton: CalendarButton,
            }}
            value={month ? dayjs(`${year}-${month}-01`) : null}
            onChange={(value) => {
              setMonth(value ? value.month() : null);
            }}
          />
        </Box>
      </KoLocalizationProvider>
    </Stack>
  );
};

export default MonthCalendarWidthYear;
