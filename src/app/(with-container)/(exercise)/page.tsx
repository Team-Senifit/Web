"use client";

import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import ExercisePageInfoCard from "./panel/ExercisePageInfoCard";
import CustomizedRoutine from "./panel/CustomizedRoutine";
import useMedia from "@/hooks/useMedia";
import PopularRoutine from "./panel/PopularRoutine";
import ThematicRoutine from "./panel/ThematicRoutine";
import useProgramStore from "@/states/useProgramStore";

const Page = () => {
  const { isPhone } = useMedia();

  const { clearStore } = useProgramStore();
  useEffect(() => {
    clearStore();
  }, [clearStore]);
  return (
    <Grid container spacing={3}>
      {isPhone && (
        <Grid size={12}>
          <ExercisePageInfoCard
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
  );
};

export default Page;
