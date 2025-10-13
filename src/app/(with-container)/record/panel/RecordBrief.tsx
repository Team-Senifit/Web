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
} from "@/app/(with-container)/record/utils/recordUtils";
import useMedia from "@/hooks/useMedia";

type Props = { record: RecordItem };

export default function RecordBrief({ record }: Props) {
  const { isPhone } = useMedia();
  const textVariant = isPhone ? "Headline1" : "Heading1";

  const chips = [
    translateDurationKind(record.durationKind),
    translateCognitiveKind(record.cognitiveKind),
    translateSingingKind(record.singingKind),
  ].filter(Boolean);

  return (
    <Box
      sx={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* 날짜 + 시간 (시간만 주황색) */}
      <Typography variant={textVariant} fontWeight={600} noWrap>
        {dateString(record.startedAt, record.finishedAt)}{" "}
        <Box component={"span"} sx={{ color: (t) => t.palette.primary.main }}>
          {timeString(record.startedAt, record.finishedAt)}
        </Box>
      </Typography>

      <Stack spacing={1} sx={{ mt: 1, alignItems: "flex-start" }}>
        {/* 참여 인원 (숫자만 주황색) */}
        <Typography variant={textVariant} noWrap>
          {"참여인원 총"}{" "}
          <Box component={"span"} sx={{ color: (t) => t.palette.primary.main }}>
            {participantString(record)}
          </Box>
          {"명"}
        </Typography>

        {/* 프로그램 제목: routineKind */}
        <Typography variant={textVariant}>
          {translateRoutineKind(record.routineKind)}
        </Typography>

        {/* 운동 조합 칩: 모바일에서는 숨김 */}
        {!isPhone && (
          <Stack direction={"row"} spacing={1.5} sx={{ flexWrap: "wrap" }}>
            {chips.map((label, idx) => (
              <Box
                key={idx}
                sx={{
                  padding: "4px 12px",
                  borderRadius: "61px",
                  background: (t) => t.palette.fillVariants.colored,
                }}
              >
                <Typography
                  variant={"Heading2"}
                  sx={{ color: (t) => t.palette.primary.main }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
