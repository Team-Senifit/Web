import { Button, Typography } from "@mui/material";
import React from "react";

interface InquiryButtonProps {
  onClick?: () => void;
  mt?: number | string;
  width?: number | string;
  height?: number | string;
  text: string;
}

const InquiryButton = ({
  onClick,
  mt = 0,
  width = 166,
  height = 32,
  text = "",
}: InquiryButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disableElevation
      sx={{
        mt,
        width,
        height,
        p: "4px 8px",
        bgcolor: "fillVariants.colored",
        borderRadius: 2,
        mx: "auto",
      }}
    >
      <Typography variant={"Headline2"} color={"primaryVariants.default"}>
        {text}
      </Typography>
    </Button>
  );
};

export default InquiryButton;
