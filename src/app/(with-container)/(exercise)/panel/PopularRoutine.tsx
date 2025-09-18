"use client";

import useMedia from "@/hooks/useMedia";
import { IHomePopularRoutineResponse } from "@/types/IPopularRoutine";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import VideoInfoCard from "./VideoInfoCard";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";

const PopularRoutine = () => {
  const { isPhone } = useMedia();

  const {
    data: {
      data: { popularRoutineList: popularRoutine },
    },
  } = useSuspenseQuery<IResponse<IHomePopularRoutineResponse>>({
    queryKey: ["/ui/home"],
  });

  return (
    <Button
      fullWidth
      component={Link}
      href={"/exercise/popular"}
      sx={{
        display: "block",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        p: 0,
      }}
    >
      <Stack
        direction={"column"}
        spacing={[2, 3]}
        sx={{
          p: [3, 4.5],
          borderRadius: [0, "0.75rem"],
          bgcolor: "background.paper",
          boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
        }}
      >
        <Stack
          spacing={1}
          direction={"column"}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
        >
          <Typography
            variant={isPhone ? "Title3" : "Title1"}
            sx={{
              color: "label.normal",
            }}
          >
            {"인기 운동 프로그램"}
          </Typography>
          <Typography
            variant={isPhone ? "Headline1" : "Heading1"}
            sx={{
              color: "label.neutral",
            }}
          >
            {"시니핏 인기 운동 프로그램을 확인해 보세요!"}
          </Typography>
        </Stack>

        <Stack direction={"column"} spacing={2}>
          {popularRoutine.map((routine) => (
            <VideoInfoCard key={routine.id} {...routine} />
          ))}
        </Stack>
      </Stack>
    </Button>
  );
};

export default PopularRoutine;
