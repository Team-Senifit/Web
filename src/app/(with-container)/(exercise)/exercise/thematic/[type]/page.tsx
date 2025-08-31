"use client";

import { Stack } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "../../../panel/ExercisePageInfoCard";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import VideoInfo from "../../panel/VideoInfo";
import ReturnButton from "@/app/(with-footer)/my-center/members/panel/ReturnButton";
import { useParams } from "next/navigation";
import { thematicWorkoutCodesLabel, WorkoutKind } from "@/types/IRoutine";

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
  {
    id: 3,
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

const Page = () => {
  const params = useParams<{ type: WorkoutKind }>();
  return (
    <Stack direction={"column"} spacing={3}>
      <ReturnButton href={"/exercise/thematic"} />
      <ExercisePageInfoCard
        title={`주제별 운동 프로그램 - ${thematicWorkoutCodesLabel[params.type as WorkoutKind]}`}
        description={
          "하고 싶은 주제를 선택하여\n운동 프로그램을 진행할 수 있어요"
        }
      />
      <Stack
        direction={"column"}
        spacing={[3, 4]}
        sx={{
          p: [3, 6],
          bgcolor: "background.paper",
          borderRadius: [0, "0.75rem"],
          width: "100%",
        }}
      >
        {popularRoutine.map((routine) => (
          <VideoInfo key={routine.id} {...routine} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Page;
