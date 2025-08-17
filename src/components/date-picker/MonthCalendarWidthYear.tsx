import React from "react";
import KoLocalizationProvider from "./KoLocalizationProvider";
import { Box, IconButton, Stack, SxProps } from "@mui/material";
import { MonthCalendar } from "@mui/x-date-pickers";
import CalendarButton from "./CalendarButton";
import { Theme } from "@emotion/react";
import CalendarTitle from "./CalendarTitle";
import dayjs from "dayjs";

const ChevronIconStyle: SxProps<Theme> = {
  width: "1.5rem",
  height: "1.5rem",
  color: "label.strong",
};

const MonthCalendarWidthYear = ({
  year,
  setYear,
  month,
  setMonth,
}: {
  year: number | null;
  setYear: React.Dispatch<React.SetStateAction<number | null>>;
  month: number | null;
  setMonth: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <Stack>
      <CalendarTitle
        title={`${year}년`}
        leftAriaLabel="이전 연도"
        rightAriaLabel="다음 연도"
        onLeftArrowClick={() => setYear((prev) => (prev ? prev - 1 : null))}
        onRightArrowClick={() => setYear((prev) => (prev ? prev + 1 : null))}
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
              setMonth(value ? value.month() + 1 : null);
            }}
          />
        </Box>
      </KoLocalizationProvider>
    </Stack>
  );
};

export default MonthCalendarWidthYear;
