"use client";

import { Box, Stack, Typography } from "@mui/material";
import {
  dateString,
  timeString,
  participantString,
  RecordItem,
  translateRoutineKind,
  translateDurationKind,
  translateCognitiveKind,
  translateSingingKind,
} from "../utils/recordUtils";

type Props = { record: RecordItem };

export default function RecordBrief({ record }: Props) {
  const chips = [
    translateDurationKind(record.durationKind),
    translateCognitiveKind(record.cognitiveKind),
    translateSingingKind(record.singingKind),
  ].filter(Boolean);

  return (
    <Box sx={{ minWidth: 0 }}>
      {/* 날짜 + 시간 (시간만 주황색) */}
      <Typography variant={"Heading1"} fontWeight={600} noWrap>
        {dateString(record.startTime, record.endTime)}{" "}
        <Box
          component={"span"}
          sx={{ color: "var(--Primary-default, #FB5F04)" }}
        >
          {timeString(record.startTime, record.endTime)}
        </Box>
      </Typography>

      <Stack spacing={1} sx={{ mt: 1 }}>
        {/* 참여 인원 (숫자만 주황색) */}
        <Typography variant={"Heading1"} noWrap>
          {"참여인원 총"}{" "}
          <Box
            component={"span"}
            sx={{ color: "var(--Primary-default, #FB5F04)" }}
          >
            {participantString(record)}
          </Box>
          {"명"}
        </Typography>

        {/* 프로그램 제목 (routineKind) */}
        <Typography variant={"Heading1"} sx={{ mt: 1 }}>
          {translateRoutineKind(record.routineKind)}
        </Typography>

        {/* 운동 조합 (duration, cognitive, singing 순서) */}
        <Stack direction={"row"} spacing={1.5} sx={{ mt: 1, flexWrap: "wrap" }}>
          {chips.map((label, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                padding: "4px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "61px",
                background: "var(--Fill-colored, #FFF5F0)",
              }}
            >
              <Typography
                variant={"Heading2"}
                sx={{ color: "var(--Primary-default, #FB5F04)" }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
