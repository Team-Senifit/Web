import { Stack } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";

const Page = () => {
  return (
    <Stack>
      <ExercisePageInfoCard
        title={"인기 운동 프로그램"}
        description={
          "시니핏에서 인기있는 운동 프로그램을 한 눈에!\n자세히 보기로 어떤 운동들이 있는지 확인해 보세요."
        }
      />
    </Stack>
  );
};

export default Page;
