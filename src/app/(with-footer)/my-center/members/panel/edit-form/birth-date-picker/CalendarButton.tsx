"use client";

import useMedia from "@/hooks/useMedia";
import { Button, ButtonProps, SxProps, Typography } from "@mui/material";
import React from "react";

const CalendarButtonStyle: SxProps = {
  width: "100%",
  height: "3.5rem",
  maxHeight: "3.5rem",
  minHeight: "3.5rem",
  color: "interaction.inactive",
  borderRadius: "0.75rem",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "borderVariants.normal",
  backgroundColor: "bg.alternative",
  textTransform: "none",
  "&:hover": {
    borderColor: "primary.main",
    backgroundColor: "fillVariants.colored",
    color: "primary.main",
  },
  "&&.Mui-selected": {
    color: "primary.main",
    borderColor: "primary.main",
    backgroundColor: "fillVariants.colored",
    "&:hover": { backgroundColor: "fillVariants.colored" },
  },
};

const CalendarButton = ({ children, ...props }: ButtonProps) => {
  const { isPhone } = useMedia();
  return (
    <Button {...props} sx={CalendarButtonStyle}>
      <Typography variant={isPhone ? "Headline1" : "Heading2"}>
        {children}
      </Typography>
    </Button>
  );
};

export default CalendarButton;
