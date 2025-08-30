import { Stack } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "./panel/ExercisePageInfoCard";

const Page = () => {
  return (
    <Stack>
      <ExercisePageInfoCard
        title={"운동"}
        description={"시니핏이 제공하는\n운동 프로그램을 진행해요"}
      />
    </Stack>
  );
};

export default Page;
