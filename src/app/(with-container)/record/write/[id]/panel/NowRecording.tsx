"use client";

import { CardContent, Typography, Box } from "@mui/material";
import { RecordItem } from "@/app/(with-container)/record/utils/recordUtils";
import RecordBrief from "@/app/(with-container)/record/utils/RecordBrief";
import GradientCard from "@/app/(with-container)/record/utils/GradientCard";

type Props = {
  record: RecordItem | null;
};

export default function NowRecording({ record }: Props) {
  return (
    <GradientCard>
      <Box sx={{ position: "relative", flex: 1, p: 0 }}>
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
          <Typography variant={"Title1"}>{"작성 중인 수업"}</Typography>
          {record && <RecordBrief record={record} />}
        </CardContent>
      </Box>
    </GradientCard>
  );
}
