import { UndoIcon } from "@/components/icons";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const ReturnButton = () => {
  return (
    <Box
      sx={{
        pt: "1.5rem",
        px: "1.5rem",
      }}
    >
      <Button
        href="/my-center"
        component={Link}
        endIcon={
          <UndoIcon
            strokeWidth={2}
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              color: "label.normal",
            }}
          />
        }
        sx={{
          width: [1, "fit-content"],
          py: [2],
          px: [8],
          bgcolor: "background.paper",
        }}
      >
        <Typography
          sx={{
            color: "label.normal",
          }}
          variant="Heading1"
        >
          {"돌아가기"}
        </Typography>
      </Button>
    </Box>
  );
};

export default ReturnButton;
