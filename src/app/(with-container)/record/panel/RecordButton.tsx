"use client";

import Link from "next/link";
import { Button, Typography } from "@mui/material";

type Props = {
  href: string;
  cta: "자세히 보기" | "작성하기";
  surveysExist: boolean;
};

export default function RecordButton({ href, cta, surveysExist }: Props) {
  const isDetail = surveysExist;

  return (
    <Button
      component={Link}
      href={href}
      disableElevation
      sx={{
        display: "flex",
        width: 237,
        padding: "16px 64px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "12px",
        background: isDetail
          ? "var(--Background-alternative, #F5F5F5)"
          : "var(--Fill-colored, #FFF5F0)",
        color: isDetail
          ? "var(--Sementic-Color-Label-color-label-neutral, var(--Label-neutral, #646568))"
          : "var(--Sementic-Color-Primary-color-primary-default, var(--Primary-default, #FB5F04))",
      }}
    >
      <Typography variant={"Heading1"} sx={{ color: "inherit" }}>
        {cta}
      </Typography>
    </Button>
  );
}
