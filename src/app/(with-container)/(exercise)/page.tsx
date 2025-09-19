"use client";

import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import GradationPageInfoCard from "../../../components/GradationPageInfoCard";
import CustomizedRoutine from "./panel/CustomizedRoutine";
import useMedia from "@/hooks/useMedia";
import PopularRoutine from "./panel/PopularRoutine";
import ThematicRoutine from "./panel/ThematicRoutine";
import useProgramStore from "@/states/useProgramStore";
import SenifitDialog from "@/components/SenifitDialog";
import Link from "next/link";
import { kakaoChannelLink } from "@/constants/kakaoCh";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";
import { IHealthCheck } from "@/types/IHealthCheck";
import dayjs from "dayjs";

const Page = () => {
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
  }, [data]);

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
          <CustomizedRoutine />
        </Grid>
        <Grid
          container
          size={{
            phone: 12,
            desktop: 6,
          }}
        >
          <Grid size={12}>
            <PopularRoutine />
          </Grid>
          <Grid size={12}>
            <ThematicRoutine />
          </Grid>
        </Grid>
      </Grid>
      <SenifitDialog
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        dialogType={"success"}
        title={"베타 테스트 무료 체험 안내"}
        body={"베타 테스트 기간 동안\n모든 기능을 무료로 이용하실 수 있습니다."}
        primaryText={"로그인 바로가기"}
        primaryButtonProps={{
          component: Link,
          href: "/login",
        }}
        secondaryText={"회원가입 문의하기"}
        secondaryButtonProps={{
          component: Link,
          href: kakaoChannelLink,
          rel: "noopener noreferrer",
        }}
      />
    </>
  );
};

export default Page;
