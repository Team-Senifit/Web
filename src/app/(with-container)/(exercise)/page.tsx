"use client";

import { Grid } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "./panel/ExercisePageInfoCard";
import CustomizedRoutine from "./panel/CustomizedRoutine";
import useMedia from "@/hooks/useMedia";
import PopularRoutine from "./panel/PopularRoutine";

const Page = () => {
  const { isPhone } = useMedia();
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
        size={{
          phone: 12,
          desktop: 6,
        }}
      >
        <PopularRoutine />
      </Grid>
    </Grid>
  );
};

export default Page;
