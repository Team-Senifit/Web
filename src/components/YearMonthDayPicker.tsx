"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";

// 예시 코드. 실제 디자인 된 이후 예시로만 쓰고 실제로는 안 쓸 가능성이 높습니다.
export default function YearMonthDayPicker() {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        openTo="year"
        views={["year", "month", "day"]}
        value={value}
        onChange={setValue}
      />
    </LocalizationProvider>
  );
}
