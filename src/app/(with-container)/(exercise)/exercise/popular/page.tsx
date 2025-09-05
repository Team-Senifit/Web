"use client";

import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import VideoInfo from "../panel/VideoInfo";
import ReturnButton from "@/components/ReturnButton";
import { IResponse } from "@/types/IResponse";
import { useSuspenseQuery } from "@tanstack/react-query";
import useProgramStore from "@/states/useProgramStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const { setId, setType, setSelectedProgram } = useProgramStore();

  useEffect(() => {
    setSelectedProgram(null);
    return () => {};
  }, []);

  const {
    data: { data: popularRoutine },
  } = useSuspenseQuery<IResponse<Array<IPopularRoutine>>>({
    queryKey: ["/programs/recommendation/by-popular", { count: "3" }],
  });

  return (
    <Stack direction={"column"} spacing={3}>
      <ReturnButton href={"/"} />
      <ExercisePageInfoCard
        title={"인기 운동 프로그램"}
        description={
          "시니핏에서 인기있는 운동 프로그램을 한 눈에!\n자세히 보기로 어떤 운동들이 있는지 확인해 보세요."
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
          <VideoInfo
            key={routine.id}
            {...routine}
            onButtonClick={() => {
              setId(routine.id);
              setType("popular");
              router.push("/exercise/members");
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Page;
