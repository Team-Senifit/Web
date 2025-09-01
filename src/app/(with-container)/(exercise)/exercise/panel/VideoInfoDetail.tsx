"use client";

import { IWorkoutVideo } from "@/types/IRoutineDetail";
import { ArrowForwardIos, ChevronLeft, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  IconButton,
  SxProps,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import VideoCard from "./VideoCard";

// const mock: IRoutineDetail = {
//   id: 1,
//   name: "시니어 맞춤 인지운동 프로그램",
//   description:
//     "태권도 동작과 듀얼태스킹을 결합한 종합 인지운동 프로그램입니다.",
//   duration: 30,
//   warmup_workout_code: "workout_kinds_warmup",
//   cooldown_workout_code: "workout_kinds_cooldown",
//   cognitive_workout_code: "workout_kinds_cognitive_kinds_taekwondo",
//   singing_workout_code: "workout_kinds_singing",
//   primary_target_code: "workout_kinds_calisthenic_targets_armsAndShoulders",
//   specialized_workout_code: "workout_kinds_cognitive_kinds_taekwondo",
//   thumbnail_path: "https://picsum.photos/300/300?random=1",
//   videos: [
//     {
//       id: 1,
//       kind_code: "workout_kinds_warmup",
//       name: "워밍업 스트레칭",
//       description: "관절을 부드럽게 풀어주는 준비운동입니다.",
//       script: "어깨를 천천히 돌려주세요. 목을 좌우로 부드럽게 움직여주세요.",
//       duration: 5,
//       video_path: "/videos/warmup_001.mp4",
//       thumbnail_path: "https://picsum.photos/300/300?random=2",
//     },
//     {
//       id: 2,
//       kind_code: "workout_kinds_cognitive_kinds_taekwondo",
//       name: "태권도 기본동작 - 준비자세",
//       description: "태권도의 기본 준비자세를 배우며 집중력을 기릅니다.",
//       script:
//         "두 발을 어깨 너비로 벌리고 허리를 곧게 펴세요. 주먹을 허리에 대고 시선은 정면을 바라보세요.",
//       duration: 8,
//       video_path: "/videos/taekwondo_basic_001.mp4",
//       thumbnail_path: "https://picsum.photos/300/300?random=3",
//     },
//     {
//       id: 3,
//       kind_code: "workout_kinds_cognitive_kinds_dualtasking",
//       name: "숫자 세기와 함께하는 팔 운동",
//       description: "팔 운동을 하면서 동시에 숫자를 세는 듀얼태스킹 운동입니다.",
//       script:
//         "팔을 위아래로 움직이면서 3의 배수를 큰 소리로 말해보세요. 3, 6, 9, 12...",
//       duration: 10,
//       video_path: "/videos/dual_task_001.mp4",
//       thumbnail_path: "https://picsum.photos/300/300?random=4",
//     },
//     {
//       id: 4,
//       kind_code: "workout_kinds_singing",
//       name: "동요와 함께하는 율동",
//       description: "친숙한 동요를 부르며 즐겁게 몸을 움직여보세요.",
//       script:
//         "나비야 나비야~ 이리 날아오너라~ 노래에 맞춰 팔을 나비처럼 펄럭여보세요.",
//       duration: 6,
//       video_path: "/videos/singing_001.mp4",
//       thumbnail_path: "https://picsum.photos/300/300?random=5",
//     },
//     {
//       id: 5,
//       kind_code: "workout_kinds_cooldown",
//       name: "마무리 이완운동",
//       description: "운동 후 근육을 이완시키는 정리운동입니다.",
//       script: "깊게 숨을 들이마시고 천천히 내쉬면서 온몸의 힘을 빼세요.",
//       duration: 1,
//       video_path: "/videos/cooldown_001.mp4",
//       thumbnail_path: "https://picsum.photos/300/300?random=6",
//     },
//   ],
// };

const VideoInfoDetail = ({ videos }: { videos: IWorkoutVideo[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemWidth = 216;

  const iconButtonStyle: SxProps = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: "4rem !important",
    height: "4rem !important",
    color: "label.normal",
    bgcolor: "background.paper",
    borderRadius: "50% !important",
    boxSizing: "border-box",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "3.5rem",
        width: "100%",
      }}
    >
      <Accordion
        sx={{
          borderRadius: "0.75rem !important",

          backgroundColor: "background.default",
          boxShadow: "none",
          "&:before": { display: "none" },
          "&.Mui-expanded": { margin: 0, borderRadius: "0.75rem" },
          "& .MuiButtonBase-root": {
            borderRadius: "0.75rem",
          },
          "&:first-of-type": {
            borderRadius: "0.75rem !important",
          },
          "&:last-of-type": {
            borderRadius: "0.75rem !important",
          },
          border: "2px solid",
          borderColor: "borderVariants.normal",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
          sx={{
            backgroundColor: "background.default",
            height: "3.5rem",
            "& .MuiAccordionSummary-content": {
              width: "fit-content",
              flexGrow: 0,
              justifyContent: "center",
              "&.Mui-expanded": { margin: "12px 0" },
            },
            borderRadius: "0.75rem 0.75rem",
            "&.Mui-expanded": {
              borderRadius: "0.75rem 0.75rem",
              borderBottom: "2px solid",
              borderColor: "borderVariants.normal",
            },
          }}
        >
          <Typography
            sx={{ color: "primary.main" }}
            variant={"Headline1"}
            component={"span"}
          >
            {"운동 자세히 보기"}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            backgroundColor: "background.default",
            borderRadius: "0 0 0.75rem 0.75rem",
            p: 0,
          }}
        >
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            {/* 이전/다음 버튼 */}
            <IconButton
              sx={{
                ...iconButtonStyle,
                left: "1rem",
                display: currentSlide === 0 ? "none" : "flex",
              }}
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            >
              <ChevronLeft
                sx={{
                  fontSize: "2.5rem",
                }}
              />
            </IconButton>

            <IconButton
              sx={{
                ...iconButtonStyle,
                right: "1rem",
                display: currentSlide === videos.length - 1 ? "none" : "flex",
              }}
              onClick={() =>
                setCurrentSlide(Math.min(videos.length - 1, currentSlide + 1))
              }
            >
              <ArrowForwardIos />
            </IconButton>

            {/* 캐러셀 트랙 */}
            <Stack
              direction={"row"}
              sx={{
                transform: `translateX(-${currentSlide * itemWidth}px)`,
                transition: "transform 0.3s ease",
                gap: 4,
                p: 4,
              }}
            >
              {videos.map((item, index) => (
                <VideoCard key={index} {...item} />
              ))}
            </Stack>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VideoInfoDetail;
