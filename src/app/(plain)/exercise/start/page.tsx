"use client";

import React, { useEffect } from "react";
import useProgramStore from "@/states/useProgramStore";
import WorkoutVideoPlaylist from "./panel/WorkoutVideoPlayer";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { selectedProgram } = useProgramStore();

  useEffect(() => {
    if (!selectedProgram) {
      router.push("/");
    }

    return () => {};
  }, [selectedProgram, router]);

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
