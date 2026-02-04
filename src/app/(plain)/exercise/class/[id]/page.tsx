"use client";

import React, { useEffect } from "react";
import useProgramStore from "@/states/useProgramStore";
import WorkoutVideoPlaylist from "./panel/WorkoutVideoPlayer";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/hooks/useClientReady";
// import { useDeadlineTrigger } from "@/hooks/useDeadlineTrigger";
// import dayjs from "dayjs";
// import { useToastStore } from "@/states/useToastStore";

const Page = () => {
  const isClientReady = useClientReady();
  const router = useRouter();
  const { selectedProgram, type } = useProgramStore();

  const classType = React.useMemo(() => {
    if (!type) return "알 수 없음";
    if (type === "customized") return "맞춤형";
    if (type === "popular") return "인기";
    if (Array.isArray(type) && type[0] === "thematic") return "주제별";
    return "알 수 없음";
  }, [type]);

  // const { setToastOpen } = useToastStore();

  useEffect(() => {
    if (!isClientReady) return;
    else if (!selectedProgram) {
      router.push("/");
    }
    return () => {};
  }, [selectedProgram, router, isClientReady]);

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
      classType={classType}
    />
  );
};

export default Page;
