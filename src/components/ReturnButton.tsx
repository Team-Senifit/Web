import { UndoIcon } from "@/components/icons";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const ReturnButton = ({ href }: { href: string }) => {
  return (
    <Box
      sx={{
        pt: ["1.5rem", 0],
        px: ["1.5rem", 0],
      }}
    >
      <Button
        component={Link}
        href={href}
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
          width: [1, "205px"],
          py: [2],
          px: [8, 0],
          bgcolor: "background.paper",
          borderRadius: "0.75rem",
        }}
      >
        <Typography
          sx={{
            color: "label.normal",
          }}
          variant={"Heading1"}
        >
          {"돌아가기"}
        </Typography>
      </Button>
    </Box>
  );
};

export default ReturnButton;
