"use client";

import Tag from "@/components/Tag";
import useMedia from "@/hooks/useMedia";
import { IPopularRoutine } from "@/types/IPopularRoutine";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import VideoInfoDetail from "./VideoInfoDetail";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";
import { IRoutineDetail } from "@/types/IRoutineDetail";
import SenifitDialog from "@/components/SenifitDialog";

interface IVideoInfoProps extends IPopularRoutine {
  onButtonClick: () => void;
}

const VideoInfo = ({
  id,
  name,
  thumbnail_path,
  duration,
  description,
  onButtonClick,
}: IVideoInfoProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { isPhone, isDesktop } = useMedia();

  const {
    data: { data },
  } = useSuspenseQuery<IResponse<IRoutineDetail>>({
    queryKey: [`/programs/${id}`],
  });

  return (
    <>
      <Stack direction={"column"} spacing={3}>
        <Stack direction={isDesktop ? "row" : "column"} spacing={[2, 4]}>
          <Box
            sx={{
              position: "relative",
              width: {
                phone: "100%",
                desktop: "30rem",
              },
              flexShrink: 0,
              overflow: "hidden",
              aspectRatio: "16/9",
              borderRadius: "0.75rem",
            }}
          >
            <Image
              src={thumbnail_path}
              alt={name}
              fill
              style={{
                objectFit: "cover",
              }}
            />
            {isPhone && (
              <Stack
                direction={"column"}
                spacing={0.5}
                alignItems={"flex-start"}
                p={2}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <Typography variant={"Heading1"} color={"label.normal"}>
                  {name}
                </Typography>
                <Tag label={`${duration}분`} />
              </Stack>
            )}
          </Box>
          <Stack direction={"column"} spacing={2} width={"100%"}>
            {!isPhone && (
              <>
                <Stack
                  direction={"column"}
                  spacing={1}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography variant={"Title1"} color={"label.normal"}>
                    {name}
                  </Typography>
                  <Tag label={`${duration}분`} />
                </Stack>
                <Typography
                  variant={"Heading1"}
                  component={"p"}
                  color={"label.neutral"}
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // 3줄로 제한
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "calc(3 * 1.75rem + 0.5rem)", // 3줄로 제한
                  }}
                >
                  {description}
                </Typography>
              </>
            )}

            <Button
              onClick={() => setOpenDialog(true)}
              fullWidth
              disableElevation
              variant={"contained"}
              color={"primary"}
              sx={{
                borderRadius: "0.75rem",
                py: 2,
                px: 8,
                mt: 2,
              }}
            >
              <Typography
                variant={"Heading1"}
                sx={{
                  color: "static.white",
                }}
              >
                {"선택하기"}
              </Typography>
            </Button>
          </Stack>
        </Stack>
        {!isPhone && <VideoInfoDetail videos={data.videos} />}
      </Stack>
      <SenifitDialog
        dialogType={"success"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title={`'${name}'을(를)\n선택할까요?`}
        primaryText={"네, 선택할게요"}
        onPrimaryClick={onButtonClick}
        secondaryText={"다시 선택"}
        onSecondaryClick={() => setOpenDialog(false)}
      />
    </>
  );
};

export default VideoInfo;
