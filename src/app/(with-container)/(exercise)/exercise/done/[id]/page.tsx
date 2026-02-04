"use client";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { axiosClient } from "@/apis/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import handclapImage from "@/assets/images/handclap.png";
import useProgramStore from "@/states/useProgramStore";
import { formatTime } from "@/stories/utils/formatTime";
import useMedia from "@/hooks/useMedia";
import Link from "next/link";
import { isAuthError } from "@/apis/errors";
import { useRouter } from "next/navigation";
import { pushGtmEvent } from "@/utils/gtm";

const Page = () => {
  const { id } = useParams();

  const { isTablet, isDesktop } = useMedia();

  const router = useRouter();

  const searchParams = useSearchParams();
  const seconds = Number(searchParams.get("seconds")) || 0;
  const { selectedProgram, type } = useProgramStore();

  const classType = React.useMemo(() => {
    if (!type) return "알 수 없음";
    if (type === "customized") return "맞춤형";
    if (type === "popular") return "인기";
    if (Array.isArray(type) && type[0] === "thematic") return "주제별";
    return "알 수 없음";
  }, [type]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axiosClient.put(`/records/${id}`);
    },
    onError: (error) => {
      if (isAuthError(error)) {
        router.push(`/login?next=/exercise/done/${id}`);
      }
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const hasSentFinish = useRef(false);
  useEffect(() => {
    if (hasSentFinish.current) return;
    if (selectedProgram && seconds >= selectedProgram.duration * 60) {
      pushGtmEvent("click_Finish", classType);
      hasSentFinish.current = true;
    }
  }, [selectedProgram, seconds, classType]);

  return (
    <Stack
      sx={{
        p: [3, 6],
        borderRadius: [0, "0.75rem"],
        bgcolor: "background.paper",
        boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
        mt: [3, 0],
      }}
      direction={"column"}
      spacing={3}
      justifyContent={"space-between"}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={["flex-start", "space-between"]}
        spacing={[3]}
        sx={{
          py: [3, 6],
        }}
      >
        <Stack direction={"column"} alignItems={"center"} spacing={[4]}>
          <Box
            component={Image}
            src={handclapImage}
            alt={""}
            width={100} // 1:1 비율 고정용(임의의 같은 값)
            height={100}
            sizes={"(max-width: 600px) 6.25rem, 12.5rem"}
            sx={{
              width: { phone: "6.25rem", tablet: "12.5rem" },
              height: { phone: "6.25rem", tablet: "12.5rem" },
              aspectRatio: "1 / 1",
            }}
            priority
            aria-hidden
          />
          <Typography
            variant={
              isDesktop ? "Display1" : isTablet ? "Display2" : "Heading1"
            }
            sx={{
              whiteSpace: "pre-line",
              textAlign: "center",
              color: "labelVariants.normal",
            }}
          >
            {"수업이 끝났습니다.\n오늘도 수고하셨습니다."}
          </Typography>
        </Stack>

        <Stack direction={"row"} spacing={2}>
          <Typography
            variant={isDesktop ? "Title1" : isTablet ? "Title2" : "Headline1"}
            sx={{ color: "labelVariants.neutral" }}
          >
            {"수업 시간"}
          </Typography>
          <Typography
            variant={isDesktop ? "Title1" : isTablet ? "Title2" : "Headline1"}
            sx={{
              color: "labelVariants.neutral",
              "& span": { color: "primary.main" },
            }}
          >
            <Box component={"span"}>{`${formatTime(seconds ?? 0)}`}</Box>
            {` / ${formatTime((selectedProgram?.duration ?? 0) * 60)}`}
          </Typography>
        </Stack>
      </Stack>
      <Divider
        sx={{
          display: ["none", "block"],
          borderColor: "borderVariants.normal",
        }}
      />
      <Stack
        direction={["column", "column", "row-reverse"]}
        justifyContent={["center", "space-between"]}
        gap={[1.25]}
      >
        <Button
          component={Link}
          href={`/record/write/${id}`} // 기록 페이지로 이동
          variant={"contained"}
          disableElevation
          sx={{
            borderRadius: "0.75rem",
            py: 2,
            px: 8,
          }}
        >
          <Typography variant={"Heading1"}>{"기록하러 가기"}</Typography>
        </Button>
        <Button
          component={Link}
          href={"/"}
          variant={"text"}
          sx={{
            borderRadius: "0.75rem",
            py: 2,
            px: 8,
            bgcolor: "fillVariants.colored",
          }}
        >
          <Typography variant={"Heading1"}>{"운동 홈으로 돌아가기"}</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default Page;
