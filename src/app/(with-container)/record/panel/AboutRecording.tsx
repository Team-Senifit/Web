"use client";

import { CardContent, Typography, Box } from "@mui/material";
import { RecordItem } from "@/app/(with-container)/record/utils/recordUtils";
import RecordBrief from "@/app/(with-container)/record/panel/RecordBrief";
import GradientCard from "@/app/(with-container)/record/panel/GradientCard";
import useMedia from "@/hooks/useMedia";

type Props = {
  record: RecordItem | null;
  title?: string;
};

export default function AboutRecording({ record, title }: Props) {
  const { isPhone, isTablet } = useMedia();
  const titleVariant = isPhone ? "Heading1" : isTablet ? "Title2" : "Title1";

  // 모바일: 흰 박스 (gradient 없는 대신에 padding 24px)
  if (isPhone) {
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: "background.normal",
        }}
      >
        <CardContent
          sx={{
            p: 0,
            "&:last-child": {
              // MUI CardContent의 기본 bottom padding 제거
              pb: 0,
            },
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography variant={titleVariant}>{title}</Typography>
          {record && <RecordBrief record={record} />}
        </CardContent>
      </Box>
    );
  }

  // 태블릿/데스크탑: GradientCard 유지
  return (
    <GradientCard>
      <Box>
        <CardContent
          sx={{
            p: 0,
            "&:last-child": {
              // MUI CardContent의 기본 bottom padding 제거
              pb: 0,
            },
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography variant={titleVariant}>{title}</Typography>
          {record && <RecordBrief record={record} />}
        </CardContent>
      </Box>
    </GradientCard>
  );
}
