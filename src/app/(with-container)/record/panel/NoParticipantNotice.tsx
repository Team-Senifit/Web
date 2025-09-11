"use client";

import { Box, Typography } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import useMedia from "@/hooks/useMedia";

export default function NoParticipantNotice() {
  const { isPhone } = useMedia();

  return (
    <Box
      sx={{
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <WarningAmberRoundedIcon
        sx={{ fontSize: 48, color: (t) => t.palette.warning.main }}
        aria-hidden
      />
      <Typography
        variant={isPhone ? "Headline1" : "Heading1"}
        sx={{
          display: "block",
          textAlign: "center",
          whiteSpace: "pre-line",
        }}
      >
        {"참여한 어르신이 없는 경우"}
        <br /> {"개별기록이 제공되지 않습니다."}
      </Typography>
    </Box>
  );
}
