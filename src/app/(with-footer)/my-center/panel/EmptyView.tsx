import CTAButton from "@/components/CTAButton";
import useMedia from "@/hooks/useMedia";
import { Stack, Typography } from "@mui/material";
import React from "react";

const EmptyView = () => {
  const { isPhone } = useMedia();
  return (
    <Stack
      direction={"column"}
      spacing={3}
      alignItems={"center"}
      sx={{
        p: 3,
        width: "100%",
      }}
    >
      <Typography
        variant={isPhone ? "Headline1" : "Heading1"}
        sx={{ color: "label.alternative" }}
      >
        {"아직 등록된 어르신이 없어요"}
      </Typography>
      <CTAButton
        href={"/my-center/members/add"}
        text={"어르신 등록하기"}
        sx={{
          color: "static.white",
          bgcolor: "primary.main",
        }}
      />
    </Stack>
  );
};

export default EmptyView;
