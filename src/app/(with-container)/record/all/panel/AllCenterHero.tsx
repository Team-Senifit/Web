"use client";

import { Stack, Typography } from "@mui/material";
import GradientCard from "@/app/(with-container)/record/utils/GradientCard";

export default function AllCenterHero({ centerName }: { centerName: string }) {
  return (
    <GradientCard>
      <Stack spacing={1}>
        <Typography variant={"Title1"}>
          {centerName} {"지난 수업 기록 전체보기"}
        </Typography>
        <Typography
          variant={"Body1"}
          sx={{ color: (t) => t.palette.text.secondary }}
        >
          {
            "지금까지 우리 센터에서 진행한 수업의 기록을 확인하고 작성할 수 있어요"
          }
        </Typography>
      </Stack>
    </GradientCard>
  );
}
