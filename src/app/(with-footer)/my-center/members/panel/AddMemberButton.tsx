import { Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const AddMemberButton = () => {
  return (
    <Button
      href="/my-center/members/add"
      component={Link}
      sx={{
        width: [1, 1, "fit-content"],
        height: "3.75rem",
        borderRadius: "0.75rem",
        px: 8,
        py: 2,
        bgcolor: "primary.main",
        color: "static.white",
      }}
    >
      <Typography variant="Heading1">{"어르신 등록하기"}</Typography>
    </Button>
  );
};

export default AddMemberButton;
