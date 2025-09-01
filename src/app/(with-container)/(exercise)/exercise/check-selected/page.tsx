"use client";

import { Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import PageInfoCard from "@/components/PageInfoCard";
import { CirclePlayIcon, SquareUserRoundIcon } from "@/components/icons";
import useProgramStore from "@/states/useProgramStore";
import { calculateAge } from "@/utils/calculateAge";
import dayjs from "dayjs";
import { genderLabel, gradeLabel } from "@/types/IMember";
import CTAButton from "@/components/CTAButton";
import useMedia from "@/hooks/useMedia";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import { IResponse } from "@/types/IResponse";
import { useSuspenseQuery } from "@tanstack/react-query";
import Tag from "@/components/Tag";
import {
  calisthenicTargetCodesLabel,
  cognitiveWorkoutCodesLabel,
} from "@/types/IRoutine";

const Page = () => {
  const { isPhone, isDesktop } = useMedia();

  const { id, type, selectedMembers, setSelectedProgram } = useProgramStore();

  const {
    data: { data: routineDetail },
  } = useSuspenseQuery<IResponse<IRoutineDetail>>({
    queryKey: [`/programs/${id}`],
  });

  const videoTitle =
    type === "customized" ? "맞춤형 운동 프로그램" : routineDetail.name;

  useEffect(() => {
    return () => {
      setSelectedProgram(routineDetail);
    };
  }, []);

  const SelectMemberAgainButton = () => {
    return (
      <CTAButton
        href={"/exercise/members"}
        variant={"text"}
        text={"참여 어르신 다시 선택하기"}
        sx={{ bgcolor: "fillVariants.colored" }}
      />
    );
  };

  return (
    <Stack>
      <ExercisePageInfoCard
        title={"수업 전 체크"}
        description={
          "수업시작 전,\n선택한 운동 프로그램과 참여 어르신을 확인해 주세요!"
        }
      />
      <Stack
        direction={"column"}
        spacing={3}
        p={[3, 6]}
        sx={{
          bgcolor: "background.paper",
          borderRadius: [undefined, "0.75rem"],
        }}
      >
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
          endAction={<SelectMemberAgainButton />}
          title={"센터 정보"}
        />
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Typography variant={!isPhone ? "Title2" : "Headline1"}>
          {"참여인원 총 "}
          <Typography
            component={"span"}
            variant={!isPhone ? "Title2" : "Headline1"}
            sx={{ color: "primary.main" }}
          >
            {selectedMembers?.length ?? 0}
          </Typography>
          {"명"}
        </Typography>
        <Typography
          variant={!isPhone ? "Heading1" : "Headline1"}
          sx={{
            color: "labelVariants.neutral",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedMembers?.map((member, idx) => {
            return `${member.name}(${calculateAge(
              dayjs(member.birthDate),
            )}/${genderLabel[member.gender]}/${gradeLabel[member.memberRank]})${
              idx === selectedMembers.length - 1 ? "" : ", "
            }`;
          })}
        </Typography>
        {!isDesktop && <SelectMemberAgainButton />}
      </Stack>
      <Stack
        direction={"column"}
        spacing={3}
        p={[3, 6]}
        sx={{
          bgcolor: "background.paper",
          borderRadius: [undefined, "0.75rem"],
        }}
      >
        <PageInfoCard
          icon={
            <CirclePlayIcon
              strokeWidth={2}
              sx={{
                color: "label.neutral",
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          }
          endAction={<SelectMemberAgainButton />}
          title={"맞춤형 운동 프로그램"}
        />
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Typography variant={!isPhone ? "Title2" : "Headline1"}>
          {videoTitle}
        </Typography>
        <Stack direction={"row"} spacing={1.5}>
          <Tag label={`${routineDetail.duration}분`} />
          {routineDetail.cognitive_workout_code !== "workout_notSelected" && (
            <Tag
              label={`${cognitiveWorkoutCodesLabel[routineDetail.cognitive_workout_code]}`}
            />
          )}
          {routineDetail.primary_target_code !== "workout_notSelected" && (
            <Tag
              label={`${calisthenicTargetCodesLabel[routineDetail.primary_target_code]}`}
            />
          )}
          {routineDetail.singing_workout_code !== "workout_notSelected" && (
            <Tag label={"노래체조 포함"} />
          )}
        </Stack>

        {!isDesktop && <SelectMemberAgainButton />}
      </Stack>
    </Stack>
  );
};

export default Page;
