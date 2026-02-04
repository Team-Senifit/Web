import Carousel from "@/components/Carousel";
import CTAButton from "@/components/CTAButton";
import { CirclePlayIcon } from "@/components/icons";
import PageInfoCard from "@/components/PageInfoCard";
import Tag from "@/components/Tag";
import VideoCard from "@/components/VideoCard";
import useMedia from "@/hooks/useMedia";
import {
  calisthenicTargetCodesLabel,
  cognitiveWorkoutCodesLabel,
  WorkoutKind,
} from "@/types/IRoutine";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import { Button, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { getGtmClassType, pushGtmEvent } from "@/utils/gtm";

const Routine = ({
  type,
  routineDetail,
  setOpenModal,
  routineUrl,
}: {
  type: "customized" | "popular" | ["thematic", WorkoutKind] | null;
  routineDetail: IRoutineDetail;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  routineUrl: string;
}) => {
  const { isPhone, isDesktop } = useMedia();

  const videoTitle =
    type === "customized" ? "맞춤형 운동 프로그램" : routineDetail.name;

  const SelectRoutineAgainButton = () => {
    return (
      <CTAButton
        href={routineUrl}
        variant={"text"}
        text={"운동 옵션 다시 선택하기"}
        sx={{
          bgcolor: "fillVariants.colored",
          wordBreak: "keep-all",
          px: [0, 0, 8],
        }}
      />
    );
  };
  return (
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
        endAction={<SelectRoutineAgainButton />}
        title={"맞춤형 운동 프로그램"}
      />
      <Divider sx={{ borderColor: "borderVariants.normal" }} />
      <Stack spacing={1}>
        <Typography variant={!isPhone ? "Title2" : "Headline1"}>
          {videoTitle}
        </Typography>
        <Stack direction={"row"} spacing={1.5} pt={1}>
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
        <Carousel
          items={routineDetail.videos}
          renderItem={(video, index) => <VideoCard key={index} {...video} />}
          itemWidth={216}
          gap={4}
          padding={4}
        />
      </Stack>
      {!isDesktop && <SelectRoutineAgainButton />}
      <Divider sx={{ borderColor: "borderVariants.normal" }} />
      <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
        <Button
          component={Link}
          href={"/exercise/members"}
          variant={"text"}
          sx={{
            bgcolor: "fillVariants.colored",
            borderRadius: "0.75rem",
            py: 2,
            px: [0, 8],
            flex: [1, "unset"],
          }}
        >
          <Typography variant={"Heading1"}>{"이전"}</Typography>
        </Button>
        <Button
          onClick={() => {
            pushGtmEvent("click_classStart", getGtmClassType(type));
            setOpenModal(true);
          }}
          variant={"contained"}
          disableElevation
          sx={{
            borderRadius: "0.75rem",
            py: 2,
            px: [0, 8],
            flex: [1, "unset"],
          }}
        >
          <Typography variant={"Heading1"}>{"수업 시작"}</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Routine;
