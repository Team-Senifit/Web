"use client";

import { Stack } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "./panel/ExercisePageInfoCard";
import CustomizedRoutine from "./panel/CustomizedRoutine";
import useMedia from "@/hooks/useMedia";

const Page = () => {
  const { isPhone } = useMedia();
  return (
    <Stack>
      {isPhone && (
        <ExercisePageInfoCard
          title={"운동"}
          description={"시니핏이 제공하는\n운동 프로그램을 진행해요"}
        />
      )}
      <CustomizedRoutine />
    </Stack>
  );
};

export default Page;
