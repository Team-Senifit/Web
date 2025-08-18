"use client";
import { useEffect, useState } from "react";
import { CalendarIcon } from "../../../../components/icons";
import { Button, Modal, Paper, Typography } from "@mui/material";
import { LunarSolarToggle, Title } from "./birth-date-picker";
import DepthToggle, { Depth } from "./birth-date-picker/DepthToggle";
import DecadeCalendar from "./birth-date-picker/DecadeCalendar";
import dayjs from "dayjs";
import MonthCalendarWidthYear from "./birth-date-picker/MonthCalendarWidthYear";
import DateCalendarWithTitle from "./birth-date-picker/DateCalendarWithTitle";
import BirthDateField from "./birth-date-picker/BirthDateField";
import { Control, useFormContext } from "react-hook-form";
import { IMemberEditFormValue } from "@/types/IMemberEdit";

const BirthDatePicker = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [depth, setDepth] = useState<Depth>("year");

  const { getValues, setValue, control } =
    useFormContext<IMemberEditFormValue>();

  const { year, month, day } = getValues();

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
                console.log(newValue?.format("YYYY-MM-DD"));
                setValue("day", newValue ? newValue.date() : null);
                setValue("month", newValue ? newValue.month() : null);
                setValue("year", newValue ? newValue.year() : null);
              }}
            />
          ) : depth === "month" ? (
            <MonthCalendarWidthYear
              year={year}
              setYear={(value) => setValue("year", value)}
              month={month}
              setMonth={(value) => {
                setValue("month", value);
                setDepth("day");
              }}
            />
          ) : (
            <DecadeCalendar
              value={year ? dayjs(`${year}-01-01`) : null}
              onChange={(value) => {
                setValue("year", value ? value.year() : null);
                setDepth("month");
              }}
            />
          )}
        </Paper>
      </Modal>
    </>
  );
};

export default BirthDatePicker;
