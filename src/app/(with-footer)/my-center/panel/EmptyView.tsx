import CTAButton from "@/components/CTAButton";
import { Stack, Typography } from "@mui/material";
import React from "react";

const EmptyView = () => {
  return (
    <Stack direction={"column"} spacing={3} p={3}>
      <Typography variant={"Headline1"} sx={{ color: "label.alternative" }}>
        {"아직 등록된 어르신이 없어요"}
      </Typography>
      <CTAButton href={"/my-center/members/add"} text={"어르신 등록하기"} />
    </Stack>
  );
};

export default EmptyView;
