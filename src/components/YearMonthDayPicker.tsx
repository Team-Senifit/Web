"use client";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import { CalendarIcon } from "./icons";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { Title, DepthButtonGroup } from "./date-picker";
import { Depth } from "./date-picker/DepthButtonGroup";

// 예시 코드. 실제 디자인 된 이후 예시로만 쓰고 실제로는 안 쓸 가능성이 높습니다.
export default function YearMonthDayPicker() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [depth, setDepth] = useState<Depth | null>(null);

  return (
    <>
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
          justifyContent: "flex-end",
        }}
        aria-labelledby="year-month-day-picker-title"
        aria-describedby="year-month-day-picker-description"
      >
        <Paper
          sx={{
            width: [1],
            height: ["22.5rem"],
          }}
        >
          <Title closeDatePicker={() => setIsOpen(false)} />
          <DepthButtonGroup
            depth={depth}
            setDepth={setDepth}
            year={0}
            month={0}
            day={0}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
          ></LocalizationProvider>
        </Paper>
      </Modal>
    </>
  );
}
