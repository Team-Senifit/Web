"use client";

import { Box, Stack, Typography } from "@mui/material";
import GradientCard from "@/app/(with-container)/record/panel/GradientCard";
import useMedia from "@/hooks/useMedia";

export default function AllCenterHero({ centerName }: { centerName: string }) {
  const { isPhone, isTablet } = useMedia();

  const titleVariant = isPhone ? "Headline1" : isTablet ? "Title2" : "Title1";
  const bodyVariant = isPhone ? "Headline1" : "Heading1";

  if (isPhone) {
    // 모바일: GradientCard 미사용, padding 24, 배경색 따로 사용
    return (
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(270deg, var(--RedOrange-60, #FC7F36) 0%, #FF8A00 100%)`,
        }}
      >
        <Stack spacing={2}>
          {/* 모바일은 centerName 미사용 */}
          <Typography
            variant={titleVariant}
            sx={{ color: (t) => t.palette.primaryVariants.disabled }}
          >
            {"지난 수업 기록 전체보기"}
          </Typography>
          <Typography
            variant={bodyVariant}
            sx={{
              color: (t) => t.palette.static.white,
              whiteSpace: "pre-line",
            }}
          >
            {
              "지금까지 우리 센터에서 진행한 수업의\n기록을 확인하고 작성할 수 있어요"
            }
          </Typography>
        </Stack>
      </Box>
    );
  }

  // 태블릿/데스크탑: 기존 GradientCard 유지
  return (
    <GradientCard>
      <Stack spacing={2}>
        <Typography variant={titleVariant}>
          <Box component={"span"} sx={{ color: (t) => t.palette.primary.main }}>
            {centerName}
          </Box>
          {" 지난 수업 기록 전체보기"}
        </Typography>
        <Typography
          variant={bodyVariant}
          sx={{ color: (t) => t.palette.label.neutral, whiteSpace: "pre-line" }}
        >
          {
            "지금까지 우리 센터에서 진행한 수업의 기록을\n확인하고 작성할 수 있어요"
          }
        </Typography>
      </Stack>
    </GradientCard>
  );
}
