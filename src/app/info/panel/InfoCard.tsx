import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const InfoCard = ({ title, content }: { title: string; content: string }) => {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        bgcolor: "lightgray",
        borderRadius: 1, // mui 기준 8px
        padding: 2,
        width: 1, // width, height에서는 1이 100%를 의미
      }}
    >
      <Typography>{title}</Typography>
      <Typography>{content}</Typography>
    </Stack>
  );
};

export default InfoCard;
