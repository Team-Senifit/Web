"use client";

import * as React from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import dayjs, { Dayjs } from "dayjs";

/** ───────────────── 타입 ─────────────────
 *  - 주석은 한글로 작성
 */
export interface IDecadeCalendarProps {
  /** 선택된 연도 (제어 컴포넌트로 사용할 때) */
  value: Dayjs | null;
  /** 연도 선택 콜백 */
  onChange: (value: Dayjs) => void;

  /** 표시 가능한 전체 하한/상한 연도 */
  minYear?: number; // 기본 1900
  maxYear?: number; // 기본 2099

  /** 초기 연대 계산에 사용할 '등록 최소 나이'(년). 기본 60 */
  minRegisterAgeYears?: number;

  /** 나이 계산 기준 날짜(기본: 오늘). 테스트나 고정 뷰에 활용 */
  initialDate?: Dayjs;
}

/** 주어진 연도가 속한 10년 구간의 시작 연도(예: 2017 -> 2010) */
const startOfDecade = (year: number) => Math.floor(year / 10) * 10;

const ChevronIconStyle: SxProps<Theme> = {
  width: "1.5rem",
  height: "1.5rem",
  color: "label.strong",
};

const DecadeCalendar = ({
  value = null,
  onChange,
  minYear = 1900,
  maxYear = 2099,
  minRegisterAgeYears = 60, // ← 현재 “등록 최소 나이” 기본 60세
  initialDate, // 주어지지 않으면 오늘(dayjs())
}: IDecadeCalendarProps) => {
  /** ───────────────── 초기 뷰(연대) 계산 ─────────────────
   *  - value가 있으면 그 연도의 연대
   *  - 없으면 (initialDate || 오늘)에서 `minRegisterAgeYears`만큼 빼서 출생연도 계산
   *  - 그 출생연도가 포함된 "12년 윈도우(10년 시작~+11)"로 초기 뷰 설정
   */
  const base = initialDate ?? dayjs();
  const birthYearForMinAge = base.subtract(minRegisterAgeYears, "year").year();
  const initialYear = value?.year() ?? birthYearForMinAge;

  const [cursorYear, setCursorYear] = React.useState<number>(initialYear);

  // 12년 고정 윈도우 계산
  const windowStart = startOfDecade(cursorYear); // 1930
  const windowEnd = windowStart + 11; // 1941 (12년)

  // 내비게이션 가능한 이전/다음 윈도우 앵커
  const prevStart = windowStart - 10; // 1920
  const prevEnd = prevStart + 11; // 1931
  const nextStart = windowStart + 10; // 1940

  // 버튼 비활성화: 이전 윈도우가 전부 minYear 이전이거나, 다음 윈도우가 전부 maxYear 이후일 때
  const prevDisabled = prevEnd < (minYear ?? -Infinity);
  const nextDisabled = nextStart > (maxYear ?? Infinity);

  // 이번 12년 구간만 보이도록 min/max 날짜 고정
  const minDate = dayjs(`${Math.max(minYear, windowStart)}-01-01`);
  const maxDate = dayjs(`${Math.min(maxYear, windowEnd)}-12-31`);

  // 연도 선택 시
  const handleSelect = (d: Dayjs) => {
    onChange?.(d);
    const y = d.year();
    // 선택 연도의 10년 시작으로 스냅 → 12년 윈도우 재계산됨
    if (startOfDecade(y) !== windowStart) setCursorYear(y);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
        {/* ───── 헤더: 12년 창, 10년 단위 내비게이션 ───── */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 1, px: 3 }}
        >
          <IconButton
            aria-label="이전 10년"
            onClick={() => setCursorYear(windowStart - 1)} // → 10년 이전으로 스냅
            disabled={prevDisabled}
            sx={ChevronIconStyle}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant={"Headline1"} fontWeight={600}>
            {`${windowStart}년 ~ ${windowEnd}년`}
          </Typography>

          <IconButton
            aria-label="다음 10년"
            onClick={() => setCursorYear(windowEnd + 1)} // → 10년 다음으로 스냅
            disabled={nextDisabled}
            sx={ChevronIconStyle}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>

        {/* ───── 본문: 해당 12년의 연도 그리드 ───── */}
        <Box
          sx={{
            "& .MuiYearCalendar-root": {
              width: 1,
              display: "grid",
              gridTemplateColumns: `repeat(${3}, minmax(0, 1fr))`, // yearsPerRow 반영
              p: 1.5,
              gap: 1, // theme.spacing(1)
            },
            "& .MuiPickersYear-root": {
              display: "contents",
              minWidth: 0,
            },
            "& .MuiPickersYear-yearButton": {
              width: "100%",
              boxSizing: "border-box",
            },
          }}
        >
          <YearCalendar
            value={value ?? undefined}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={maxDate}
            yearsPerRow={3} // 12년 => 3x4 그리드가 딱 맞음
            yearsOrder="asc"
            slotProps={{
              yearButton: {
                sx: {
                  width: "100%",
                  height: "3.5rem",
                  maxHeight: "3.5rem",
                  minHeight: "3.5rem",
                  color: "interaction.inactive",
                  borderRadius: "0.75rem",
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: "borderVariants.normal",
                  backgroundColor: "bg.alternative",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "fillVariants.colored",
                    color: "primary.main",
                  },
                  "&&.Mui-selected": {
                    color: "primary.main",
                    borderColor: "primary.main",
                    backgroundColor: "fillVariants.colored",
                    "&:hover": { backgroundColor: "fillVariants.colored" },
                  },
                },
              },
            }}
          />
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};

export default DecadeCalendar;
