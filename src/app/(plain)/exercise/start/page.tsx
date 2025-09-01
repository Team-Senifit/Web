"use client";

import React from "react";
import Header from "./panel/Header";
import useProgramStore from "@/states/useProgramStore";
import WorkoutVideoPlaylist from "./panel/WorkoutVideoPlayer";

const Page = () => {
  const { selectedProgram } = useProgramStore();
  if (!selectedProgram) return null;

  return (
    <div>
      <Header />
      <WorkoutVideoPlaylist
        videos={selectedProgram?.videos}
        initialId={selectedProgram?.videos[0]?.id}
      />
    </div>
  );
};

export default Page;
