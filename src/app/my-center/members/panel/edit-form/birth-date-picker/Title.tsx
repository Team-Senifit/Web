import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { CrossIcon } from "../../../../../../components/icons";

const Title = ({ closeDatePicker }: { closeDatePicker: () => void }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
    >
      <Box sx={{ width: "1.5rem", height: "1.5rem", color: "label.strong" }} />
      <Typography
        id="year-month-day-picker-title"
        variant="Headline1"
        sx={{ color: "label.strong" }}
      >
        생년월일 수정하기
      </Typography>
      <Button
        onClick={closeDatePicker}
        sx={{ p: 0, minHeight: "unset", minWidth: "unset" }}
      >
        <CrossIcon
          sx={{
            width: "1.5rem",
            height: "1.5rem",
            color: "label.strong",
          }}
          strokeWidth={2}
        />
      </Button>
    </Stack>
  );
};

export default Title;
