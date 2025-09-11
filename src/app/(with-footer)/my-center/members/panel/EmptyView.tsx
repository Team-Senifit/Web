import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

const EmptyView = () => {
  const { isPhone } = useMedia();
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={["9.75rem", "10rem"]}
      width={1}
    >
      <Typography
        sx={{ color: "label.alternative", textAlign: "center" }}
        variant={isPhone ? "Headline1" : "Heading1"}
      >
        {"아직 등록한 어르신이 없어요"}
      </Typography>
    </Stack>
  );
};

export default EmptyView;
