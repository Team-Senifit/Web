"use client";

import { ButtonProps, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GradationPageInfoCard from "../../../components/GradationPageInfoCard";
import CustomizedRoutine from "./panel/CustomizedRoutine";
import useMedia from "@/hooks/useMedia";
import PopularRoutine from "./panel/PopularRoutine";
import ThematicRoutine from "./panel/ThematicRoutine";
import useProgramStore from "@/states/useProgramStore";
import SenifitDialog from "@/components/SenifitDialog";
import Link from "next/link";
// import { kakaoChannelLink } from "@/constants/kakaoCh";
import { signupGoogleForm } from "@/constants/signupGF";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";
import { IHealthCheck } from "@/types/IHealthCheck";
import dayjs from "dayjs";
import { useClientReady } from "@/hooks/useClientReady";
import LoadingFallback from "@/app/panel/LoadingFallback";

function ClientContent() {
  const { isPhone } = useMedia();
  const [openModal, setOpenModal] = useState(false);

  const { clearStore } = useProgramStore();

  const {
    data: { data },
  } = useSuspenseQuery<IResponse<IHealthCheck>>({
    queryKey: ["/health"],
  });

  useEffect(() => {
    clearStore();
  }, [clearStore]);

  useEffect(() => {
    const betaModalShownDate =
      window.localStorage.getItem("betaModalShownDate");
    if (
      data.authenticated === false && // 로그인이 안되어있고
      (!betaModalShownDate || !dayjs().isSame(betaModalShownDate, "day")) // 오늘 날짜에 모달을 본적이 없으면
    ) {
      setOpenModal(true);
      window.localStorage.setItem(
        "betaModalShownDate",
        dayjs().format("YYYY-MM-DD"),
      );
    }
  }, [data.authenticated]);

  return (
    <>
      <Grid container spacing={3}>
        {isPhone && (
          <Grid size={12}>
            <GradationPageInfoCard
              title={"운동"}
              description={"시니핏이 제공하는\n운동 프로그램을 진행해요"}
            />
          </Grid>
        )}
        <Grid
          size={{
            phone: 12,
            desktop: 6,
          }}
        >
          <CustomizedRoutine authenticated={data.authenticated} />
        </Grid>
        <Grid
          container
          size={{
            phone: 12,
            desktop: 6,
          }}
        >
          <Grid size={12}>
            <PopularRoutine authenticated={data.authenticated} />
          </Grid>
          <Grid size={12}>
            <ThematicRoutine authenticated={data.authenticated} />
          </Grid>
        </Grid>
      </Grid>
      <SenifitDialog
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        dialogType={"success"}
        title={"베타 테스트 무료 체험 안내"}
        body={"베타 테스트 기간 동안\n모든 기능을 무료로 이용하실 수 있습니다."}
        primaryText={"로그인 바로가기"} // 해당 창에서 로그인 페이지로
        primaryButtonProps={{
          component: Link,
          href: "/login",
        }}
        secondaryText={"회원가입 문의하기"} // 새창 띄어서 구글폼으로
        secondaryButtonProps={
          {
            component: Link,
            href: signupGoogleForm,
            target: "_blank",
            rel: "noopener noreferrer",
          } as ButtonProps
        }
      />
    </>
  );
}

const Page = () => {
  // 이 페이지는 /health(auth) 결과에 따라 href가 바뀌어서
  // SSR(쿠키 미전달)과 CSR(쿠키 포함) 결과가 달라지면 hydration mismatch가 발생할 수 있음.
  // 따라서 마운트 후에만 실제 UI를 렌더링한다.
  const isClientReady = useClientReady();
  if (!isClientReady) return <LoadingFallback />;
  return <ClientContent />;
};

export default Page;
