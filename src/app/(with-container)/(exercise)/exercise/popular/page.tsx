"use client";

import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import GradationPageInfoCard from "../../../../../components/GradationPageInfoCard";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import VideoInfo from "../panel/VideoInfo";
import ReturnButton from "@/components/ReturnButton";
import { IResponse } from "@/types/IResponse";
import { useSuspenseQuery } from "@tanstack/react-query";
import useProgramStore from "@/states/useProgramStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const {
    setType,
    setSelectedProgram,
    selectedRoutineRecord,
    setSelectedRoutineRecord,
  } = useProgramStore();

  useEffect(() => {
    setSelectedProgram(null);
    return () => {};
  }, [setSelectedProgram]);

  const {
    data: { data: popularRoutine },
  } = useSuspenseQuery<IResponse<Array<IPopularRoutine>>>({
    queryKey: ["/programs/recommendation/by-popular", { count: "3" }],
  });

  return (
    <Stack direction={"column"} spacing={[2, 3]}>
      <ReturnButton href={"/"} />
      <Stack direction={"column"} spacing={3}>
        <GradationPageInfoCard
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
            boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
            width: "100%",
          }}
        >
          {popularRoutine.map((routine) => (
            <VideoInfo
              key={routine.id}
              {...routine}
              gtmId={`popular_Select${routine.duration}`}
              onButtonClick={() => {
                setType("popular");
                setSelectedRoutineRecord({
                  ...selectedRoutineRecord,
                  programId: routine.id,
                  routineKind: "workout_programs_selections_byPopular",
                  cognitiveKind: "workout_notSelected",
                  targetKind: "workout_notSelected",
                  singingKind: "workout_notSelected",
                });
                router.push("/exercise/members");
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
