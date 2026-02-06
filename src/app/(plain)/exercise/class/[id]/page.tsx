"use client";

import React, { useEffect } from "react";
import useProgramStore from "@/states/useProgramStore";
import WorkoutVideoPlaylist from "./panel/WorkoutVideoPlayer";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/hooks/useClientReady";
import { getGtmClassType, pushGtmEvent } from "@/utils/gtm";
// import { useDeadlineTrigger } from "@/hooks/useDeadlineTrigger";
// import dayjs from "dayjs";
// import { useToastStore } from "@/states/useToastStore";

const Page = () => {
  const isClientReady = useClientReady();
  const router = useRouter();
  const { selectedProgram, type } = useProgramStore();

  // const { setToastOpen } = useToastStore();

  const startFired = React.useRef(false);
  useEffect(() => {
    if (!isClientReady) return;
    else if (!selectedProgram) {
      router.push("/");
    } else if (!startFired.current) {
      pushGtmEvent("class_Start", getGtmClassType(type));
      startFired.current = true;
    }
    return () => {};
  }, [selectedProgram, router, isClientReady, type]);

  if (!selectedProgram) return null;

  // useDeadlineTrigger({
  //   at: dayjs().add(selectedProgram?.duration || 0, "minute"),
  //   onFire: () =>
  //     setToastOpen({
  //       message: `목표수업시간 ${selectedProgram?.duration ? Math.floor(selectedProgram?.duration) : 0}분이 되었어요!`,
  //     }),
  //   enabled: !!selectedProgram,
  // });

  return (
    <WorkoutVideoPlaylist
      duration={selectedProgram?.duration}
      videos={selectedProgram?.videos}
      initialId={selectedProgram?.videos[0]?.id}
      type={type}
    />
  );
};

export default Page;
