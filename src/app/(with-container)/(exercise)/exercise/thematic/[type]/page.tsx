"use client";

import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExercisePageInfoCard from "../../../panel/ExercisePageInfoCard";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import VideoInfo from "../../panel/VideoInfo";
import ReturnButton from "@/components/ReturnButton";
import { useParams, useRouter } from "next/navigation";
import { thematicWorkoutCodesLabel, WorkoutKind } from "@/types/IRoutine";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/apis/axiosClient";
import useProgramStore from "@/states/useProgramStore";

const Page = () => {
  const params = useParams<{ type: WorkoutKind }>();

  const router = useRouter();

  const [routines, setRoutines] = useState<IPopularRoutine[]>([]);

  const { setId, setType } = useProgramStore();

  const { mutate } = useMutation({
    mutationFn: () =>
      axiosClient.post("/programs/recommendation/by-target", {
        workout_kind: params.type,
      }),
    onSuccess: ({ data }) => {
      setRoutines(data.data);
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  if (routines.length === 0) return null;

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
        {routines.map((routine) => (
          <VideoInfo
            key={routine.id}
            {...routine}
            onButtonClick={() => {
              setId(routine.id);
              setType("thematic");
              router.push("/exercise/members");
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Page;
