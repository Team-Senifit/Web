"use client";

import { CardContent, Typography, Box } from "@mui/material";
import { RecordItem } from "@/app/(with-container)/record/utils/recordUtils";
import RecordBrief from "@/app/(with-container)/record/panel/RecordBrief";
import GradientCard from "@/app/(with-container)/record/panel/GradientCard";

type Props = {
  record: RecordItem | null;
  title?: string;
};

export default function NowRecording({ record, title }: Props) {
  return (
    <GradientCard>
      <Box sx={{ position: "relative", flex: 1 }}>
        <CardContent
          sx={{
            p: 0,
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Typography variant={"Title1"}>{title}</Typography>
          {record && <RecordBrief record={record} />}
        </CardContent>
      </Box>
    </GradientCard>
  );
}
