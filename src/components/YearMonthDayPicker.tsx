"use client";
import { useState } from "react";
import { CalendarIcon } from "./icons";
import { Button, Modal, Paper, Typography } from "@mui/material";
import { LunarSolarToggle, Title } from "./date-picker";
import DepthToggle, { Depth } from "./date-picker/DepthToggle";
import DecadeCalendar from "./date-picker/DecadeCalendar";
import dayjs from "dayjs";
import MonthCalendarWidthYear from "./date-picker/MonthCalendarWidthYear";
import DateCalendarWithTitle from "./date-picker/DateCalendarWithTitle";
import BirthDateField from "./date-picker/BirthDateField";
import { useForm } from "react-hook-form";

interface IFormValue {
  year: number | null;
  month: number | null;
  day: number | null;
}

export default function YearMonthDayPicker() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [depth, setDepth] = useState<Depth>("year");

  // 임시 처리
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);

  const { control } = useForm<IFormValue>();

  return (
    <>
      <BirthDateField control={control} />
      <Button
        onClick={() => setIsOpen(true)}
        sx={{
          bgcolor: "fillVariants.colored",
          width: "16rem",
          py: 2,
          px: 6,
          borderRadius: "0.75rem",
        }}
        startIcon={
          <CalendarIcon
            sx={{ width: "1.5rem", height: "1.5rem" }}
            strokeWidth={2}
          />
        }
      >
        <Typography variant="Headline1" sx={{ color: "primary.main" }}>
          생년월일 수정하기
        </Typography>
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: ["flex-end", "center"],
        }}
        aria-labelledby="year-month-day-picker-title"
      >
        <Paper
          sx={{
            width: [1, "34.5rem"],
            height: ["36.25rem"],
            borderRadius: "0.75rem",
            borderBottomRightRadius: [0, "0.75rem"],
            borderBottomLeftRadius: [0, "0.75rem"],
          }}
        >
          <Title closeDatePicker={() => setIsOpen(false)} />
          <DepthToggle
            depth={depth}
            setDepth={setDepth}
            year={year}
            month={month}
            day={day}
          />
          {/* RHF 연결 이후 처리 */}
          <LunarSolarToggle calendarType={"solar"} setCalendarType={() => {}} />
          {depth === "day" ? (
            <DateCalendarWithTitle
              year={year}
              month={month}
              day={day}
              onChange={(newValue) => {
                setYear(newValue ? newValue.year() : null);
                setMonth(newValue ? newValue.month() + 1 : null);
                setDay(newValue ? newValue.date() : null);
              }}
            />
          ) : depth === "month" ? (
            <MonthCalendarWidthYear
              year={year}
              setYear={setYear}
              month={month}
              setMonth={(value) => {
                setMonth(value);
                setDepth("day");
              }}
            />
          ) : (
            <DecadeCalendar
              value={year ? dayjs(`${year}-01-01`) : null}
              onChange={(value) => {
                setYear(value ? value.year() : null);
                setDepth("month");
              }}
            />
          )}
        </Paper>
      </Modal>
    </>
  );
}
