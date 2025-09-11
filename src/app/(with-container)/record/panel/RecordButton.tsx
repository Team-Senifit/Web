"use client";

import Link from "next/link";
import { Button, Typography } from "@mui/material";
import SurveyIcon from "@/components/icons/SurveyIcon";

type Props = {
  href: string;
  cta: "자세히 보기" | "작성하기";
  surveysExist: boolean;
  participantCount?: number;
};

export default function RecordButton({
  href,
  cta,
  surveysExist,
  participantCount = 0,
}: Props) {
  const isDetail = participantCount === 0 ? true : surveysExist;

  return (
    <Button
      component={Link}
      href={href}
      disableElevation
      sx={{
        display: "inline-flex",
        width: 237,
        padding: "16px 64px",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        borderRadius: "12px",
        background: (t) =>
          isDetail ? t.palette.background.default : t.palette.primary.main,
        color: (t) => (isDetail ? t.palette.grey[600] : t.palette.static.white),
      }}
    >
      <Typography variant={"Heading1"} sx={{ color: "inherit" }}>
        {cta}
      </Typography>
      {/* 작성하기일 때만 SurveyIcon 표시 */}
      {cta === "작성하기" && <SurveyIcon />} {/* 아이콘에 색상 정보 남겨야함 */}
    </Button>
  );
}
