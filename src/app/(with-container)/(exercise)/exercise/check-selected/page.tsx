import { Stack } from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import PageInfoCard from "@/components/PageInfoCard";
import { SquareUserRoundIcon } from "@/components/icons";

const page = () => {
  return (
    <Stack>
      <ExercisePageInfoCard
        title={"수업 전 체크"}
        description={
          "수업시작 전,\n선택한 운동 프로그램과 참여 어르신을 확인해 주세요!"
        }
      />
      <Stack>
        <PageInfoCard
          icon={
            <SquareUserRoundIcon
              strokeWidth={2}
              sx={{
                color: "label.neutral",
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          }
          title={"센터 정보"}
        />
      </Stack>
    </Stack>
  );
};

export default page;
