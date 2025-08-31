import { Typography } from "@mui/material";
import React from "react";

const Tag = ({ label }: { label: string }) => {
  return (
    <Typography
      variant={"Headline1"}
      component={"span"}
      sx={{
        borderRadius: "6.25rem",
        px: 1,
        py: 0.5,
        bgcolor: "fillVariants.colored",
        color: "primary.main",
      }}
    >
      {label}
    </Typography>
  );
};

export default Tag;
