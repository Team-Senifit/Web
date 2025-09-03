"use client";

import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
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
import Carousel from "@/components/Carousel";
import VideoCard from "@/components/VideoCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CHANNEL = "class-status";
const STORAGE_KEY = "__bc_class-status";

const Page = () => {
  const { isPhone, isDesktop } = useMedia();

  const router = useRouter();
  const handled = useRef<Set<string>>(new Set()); // 중복 방지

  useEffect(() => {
    // 1) BroadcastChannel 만들기 (mount마다 새로 생성)
    const bc = new BroadcastChannel(CHANNEL);

    const handleDone = (id: string) => {
      if (handled.current.has(id)) return;
      handled.current.add(id);
      router.push("/exercise/done");
    };

    const onBc = (e: MessageEvent) => {
      // eslint-disable-next-line
      const { type, id } = (e as any).data || {};
      if (type === "CLASS_DONE" && typeof id === "string") handleDone(id);
    };
    bc.addEventListener("message", onBc);

    // 2) storage 폴백 (구형/특수환경 대비)
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const { type, id } = JSON.parse(e.newValue);
        if (type === "CLASS_DONE" && typeof id === "string") handleDone(id);
      } catch {}
    };
    window.addEventListener("storage", onStorage);

    return () => {
      bc.removeEventListener("message", onBc);
      bc.close(); // 이 이펙트가 만든 인스턴스만 닫힘 (StrictMode 안전)
      window.removeEventListener("storage", onStorage);
    };
  }, [router]);

  const { id, type, selectedMembers, setSelectedProgram } = useProgramStore();

  useEffect(() => {
    if (!type || !id) {
      window.alert(
        "운동 프로그램을 선택해 주세요. (이후 토스트 틍으로... 수정해야합니다.)",
      );
      router.push("/");
    }

    return () => {};
  }, []);

  const {
    data: { data: routineDetail },
  } = useSuspenseQuery<IResponse<IRoutineDetail>>({
    queryKey: [`/programs/${id}`],
  });

  const videoTitle =
    type === "customized" ? "맞춤형 운동 프로그램" : routineDetail.name;

  let routineUrl: string;

  if (type === "customized" || type === "popular") {
    routineUrl = `/exercise/${type}`;
  } else if (type === null) {
    routineUrl = `/`;
  } else {
    routineUrl = `/exercise/thematic/${type[1]}`;
  }

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
        sx={{
          bgcolor: "fillVariants.colored",
          wordBreak: "keep-all",
          px: [0, 0, 8],
        }}
      />
    );
  };

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
    <Stack direction={"column"} spacing={[3]}>
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
            component={Link}
            href={"/exercise/start"}
            target={"_blank"}
            rel={"noopener noreferrer"}
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
    </Stack>
  );
};

export default Page;
