"use client";

import { SquareUserRoundIcon } from "@/components/icons";
import useMedia from "@/hooks/useMedia";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Member = ({ name, age, grade, gender }: IMember) => {
  return (
    <>
      <Grid size={4}>
        <Typography>{name}</Typography>
      </Grid>
      <Grid size={2}>
        <Typography>{age}세</Typography>
      </Grid>
      <Grid size={2}>
        <Typography>{grade}</Typography>
      </Grid>
      <Grid size={2}>
        <Typography>{gender} </Typography>
      </Grid>
    </>
  );
};

const MemberInfoCard = ({
  count,
  members,
}: {
  count: number;
  members: Array<IMember>;
}) => {
  const { isPhone } = useMedia();
  return (
    <Stack
      component={"section"}
      spacing={2}
      direction="column"
      alignItems={"start"}
      sx={{
        bgcolor: "background.paper",
        width: 1,
        minHeight: ["16.25rem", "28rem"],
        borderRadius: [0, "0.75rem"],
        px: [3, 6],
        py: [3, 4.5],
      }}
    >
      <Stack
        direction={"column"}
        spacing={1}
        sx={{
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <SquareUserRoundIcon
          sx={{ width: 24, height: 24, color: "label.neutral" }}
          strokeWidth={2}
        />
        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: "label.neutral" }}
        >
          {"센터인원"}
        </Typography>
      </Stack>
      <Typography
        variant={isPhone ? "Headline1" : "Heading1"}
        sx={{ color: "label.normal", whiteSpace: "pre-line", pt: 2 }}
      >
        {"현재 등록된 어르신은\n"}
        <Typography
          component="span"
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: "primaryVariants.default" }}
        >{`${count}명 `}</Typography>
        {"입니다."}
      </Typography>
      <Button
        variant="text"
        fullWidth
        component={Link}
        href={"/my-center/members"}
        sx={{ bgcolor: "fillVariants.colored", py: 2, px: 2 }}
      >
        <Typography variant={"Heading1"}>관리하기</Typography>
      </Button>
    </Stack>
  );
};

export default MemberInfoCard;
