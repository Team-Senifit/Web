import React from "react";
import KoLocalizationProvider from "./KoLocalizationProvider";
import { Box, Stack } from "@mui/material";
import { Dayjs } from "dayjs";
import { MonthNumberGrid } from "./MonthNumberGrid";
import CalendarTitle from "./CalendarTitle";

const DateCalendarWithTitle = ({
  value,
  onChange,
}: {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}) => {
  if (value === null) return null;
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
            // date calendar로 바꾸기
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
            value={value}
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
