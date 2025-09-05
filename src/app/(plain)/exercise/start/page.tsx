"use client";

import React, { useEffect } from "react";
import useProgramStore from "@/states/useProgramStore";
import WorkoutVideoPlaylist from "./panel/WorkoutVideoPlayer";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/hooks/useClientReady";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/apis/axiosClient";

const Page = () => {
  const isClientReady = useClientReady();
  const router = useRouter();
  const { selectedProgram, selectedRoutineRecord } = useProgramStore();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axiosClient.post("/api/record", {
        programId: selectedRoutineRecord?.programId,
        participants: selectedRoutineRecord?.participants,
        routineKind: selectedRoutineRecord?.routineKind,
        cognitiveKind: selectedRoutineRecord?.cognitiveKind,
        singingKind: selectedRoutineRecord?.singingKind,
        durationKind: selectedRoutineRecord?.durationKind,
        targetKind: selectedRoutineRecord?.targetKind,
      });
    },
  });

  useEffect(() => {
    if (!isClientReady) return;
    else if (!selectedProgram || !selectedRoutineRecord) {
      router.push("/");
    } else {
      mutate();
    }

    return () => {};
  }, [selectedProgram, router, isClientReady, selectedRoutineRecord, mutate]);

  if (!selectedProgram) return null;

  return (
    <div>
      <WorkoutVideoPlaylist
        duration={selectedProgram?.duration}
        videos={selectedProgram?.videos}
        initialId={selectedProgram?.videos[0]?.id}
      />
    </div>
  );
};

export default Page;
