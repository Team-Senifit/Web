import React from "react";
import KoLocalizationProvider from "./KoLocalizationProvider";
import { Box, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { MonthNumberGrid } from "./MonthNumberGrid";
import CalendarTitle from "./CalendarTitle";

const DateCalendarWithTitle = ({
  year,
  month,
  day,
  onChange,
}: {
  year: number | null;
  month: number | null;
  day: number | null;
  onChange: (newValue: Dayjs | null) => void;
}) => {
  if (year === null || month === null) return null;
  const value = dayjs(`${year}-${month - 1}-${day || 1}`);
  return (
    <Stack>
      <CalendarTitle
        title={value.format("YYYY년 MM월")}
        leftAriaLabel="이전 달"
        rightAriaLabel="다음 달"
        onLeftArrowClick={() => onChange(value.subtract(1, "month"))}
        onRightArrowClick={() => onChange(value.add(1, "month"))}
        prevDisabled={value.month() === 0 && value.year() <= 1900}
        nextDisabled={value.month() === 11 && value.year() >= 2099}
      />
      <KoLocalizationProvider>
        <Box
          sx={{
            height: "100%",
            "& .MuiPickersCalendarHeader-root": { display: "none" },
            "& .MuiDayCalendar-header": { display: "none" },
            "& .MuiDayCalendar-monthContainer": {
              width: "100%",
            },
            "& .MuiDayCalendar-weekContainer": {
              width: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(${7}, minmax(0, 1fr))`, // yearsPerRow 반영
              gap: "0.25rem",
              pb: "0.25rem",
            },
            "& .MuiPickersDay-root": {
              boxSizing: "border-box",
              width: "100%",
            },
            "& .MuiPickersDay-dayButton": {
              width: "100%",
              boxSizing: "border-box",
            },
          }}
        >
          <MonthNumberGrid
            year={value?.year()}
            month={value?.month()}
            day={day}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        </Box>
      </KoLocalizationProvider>
    </Stack>
  );
};

export default DateCalendarWithTitle;
