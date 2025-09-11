"use client";

import { ButtonProps, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import useProgramStore from "@/states/useProgramStore";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import { IResponse } from "@/types/IResponse";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Members from "./panel/Members";
import Routine from "./panel/Routine";
import SenifitDialog from "@/components/SenifitDialog";
import Link from "next/link";

const CHANNEL = "class-status";
const STORAGE_KEY = "__bc_class-status";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);

  const { type, selectedMembers, setSelectedProgram, selectedRoutineRecord } =
    useProgramStore();

  let routineUrl: string;

  if (type === "customized" || type === "popular") {
    routineUrl = `/exercise/${type}`;
  } else if (type === null) {
    routineUrl = `/`;
  } else {
    routineUrl = `/exercise/thematic/${type[1]}`;
  }

  const router = useRouter();
  const handled = useRef<Set<string>>(new Set()); // 중복 방지

  useEffect(() => {
    // 1) BroadcastChannel 만들기 (mount마다 새로 생성)
    const bc = new BroadcastChannel(CHANNEL);

    const handleDone = (id: string, programId: string, seconds: number) => {
      if (handled.current.has(id)) return;
      handled.current.add(id);
      router.push(`/exercise/done/${programId}?seconds=${seconds}`);
    };

    const onBc = (e: MessageEvent) => {
      // eslint-disable-next-line
      const { type, id, programId, seconds } = (e as any).data || {};
      if (type === "CLASS_DONE" && typeof id === "string")
        handleDone(id, programId, seconds);
    };
    bc.addEventListener("message", onBc);

    // 2) storage 폴백 (구형/특수환경 대비)
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const { type, id, programId, seconds } = JSON.parse(e.newValue);
        if (type === "CLASS_DONE" && typeof id === "string")
          handleDone(id, programId, seconds);
      } catch {}
    };
    window.addEventListener("storage", onStorage);

    return () => {
      bc.removeEventListener("message", onBc);
      bc.close(); // 이 이펙트가 만든 인스턴스만 닫힘 (StrictMode 안전)
      window.removeEventListener("storage", onStorage);
    };
  }, [router]);

  const {
    data: { data: routineDetail },
  } = useSuspenseQuery<IResponse<IRoutineDetail>>({
    queryKey: [`/programs/${selectedRoutineRecord?.programId}`],
  });

  useEffect(() => {
    setSelectedProgram(routineDetail);

    return () => {};
  }, [routineDetail, setSelectedProgram]);

  useEffect(() => {
    if (!type || !selectedRoutineRecord) {
      window.alert(
        "운동 프로그램을 선택해 주세요. (이후 토스트 틍으로... 수정해야합니다.)",
      );
      router.push("/");
    }

    return () => {};
  }, [type, router, selectedRoutineRecord]);

  return (
    <>
      <Stack direction={"column"} spacing={[3]}>
        <ExercisePageInfoCard
          title={"수업 전 체크"}
          description={
            "수업시작 전,\n선택한 운동 프로그램과 참여 어르신을 확인해 주세요!"
          }
        />
        <Members selectedMembers={selectedMembers} />
        <Routine
          type={type}
          routineDetail={routineDetail}
          setOpenModal={setOpenModal}
          routineUrl={routineUrl}
        />
      </Stack>
      <SenifitDialog
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        dialogType={"success"}
        title={"이제 수업을 시작할까요?"}
        primaryText={"네, 시작할게요"}
        primaryButtonProps={
          {
            component: Link,
            href: "/exercise/start",
            target: "_blank",
            rel: "noopener noreferrer",
          } as ButtonProps
        }
        secondaryText={type === "customized" ? "수정하기" : "돌아가기"}
        secondaryButtonProps={
          {
            component: Link,
            href: routineUrl,
          } as ButtonProps
        }
      />
    </>
  );
};

export default Page;
