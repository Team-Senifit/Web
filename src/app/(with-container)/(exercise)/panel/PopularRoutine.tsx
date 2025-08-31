import useMedia from "@/hooks/useMedia";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import VideoInfoCard from "./VideoInfoCard";
import Link from "next/link";

const popularRoutine: Array<IPopularRoutine> = [
  {
    id: 1,
    name: "루틴 1",
    description: "루틴 1 설명",
    duration: 30,
    warmup_workout_code: "WARMUP_1",
    cooldown_workout_code: "COOLDOWN_1",
    cognitive_workout_code: "COGNITIVE_1",
    singing_workout_code: "SINGING_1",
    primary_target_code: "PRIMARY_1",
    specialized_workout_code: "SPECIALIZED_1",
    thumbnail_path: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    name: "루틴 2",
    description: "루틴 2 설명",
    duration: 45,
    warmup_workout_code: "WARMUP_2",
    cooldown_workout_code: "COOLDOWN_2",
    cognitive_workout_code: "COGNITIVE_2",
    singing_workout_code: "SINGING_2",
    primary_target_code: "PRIMARY_2",
    specialized_workout_code: "SPECIALIZED_2",
    thumbnail_path: "https://picsum.photos/200/300",
  },
];

const PopularRoutine = () => {
  const { isPhone } = useMedia();
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
        height: "32rem",
      }}
    >
      <Stack
        direction={"column"}
        spacing={[2, 3]}
        sx={{
          p: [3, 4.5],
          borderRadius: [0, "0.75rem"],
          bgcolor: "background.paper",
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
