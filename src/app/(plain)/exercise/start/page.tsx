"use client";

import { useEffect } from "react";
import useProgramStore from "@/states/useProgramStore";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/hooks/useClientReady";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/apis/axiosClient";
import { IResponse } from "@/types/IResponse";
import LoadingFallback from "@/app/panel/LoadingFallback";
import { notifyLogout } from "@/utils/broadcast";

const Page = () => {
  const isClientReady = useClientReady();
  const router = useRouter();
  const { selectedProgram, selectedRoutineRecord } = useProgramStore();

  const { mutate } = useMutation({
    mutationFn: async (): Promise<IResponse<{ id: number }>> => {
      const response = await axiosClient.post<IResponse<{ id: number }>>(
        "/records",
        {
          programId: selectedRoutineRecord?.programId,
          participants: selectedRoutineRecord?.participants || [],
          routineKind: selectedRoutineRecord?.routineKind,
          cognitiveKind: selectedRoutineRecord?.cognitiveKind,
          singingKind: selectedRoutineRecord?.singingKind,
          targetKind: selectedRoutineRecord?.targetKind,
        },
      );
      return response.data;
    },
    onSuccess: (data: IResponse<{ id: number }>) => {
      router.push(`/exercise/class/${data.data.id}`);
    },
    onError: () => {
      // LOGIN_NEEDED broadcast하기
      notifyLogout();
      setTimeout(() => {
        try {
          window.close();
        } catch {}
      }, 150);
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

  return <LoadingFallback />;
};

export default Page;
