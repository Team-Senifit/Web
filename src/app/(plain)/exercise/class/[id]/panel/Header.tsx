"use client";

import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Timer from "./Timer";
import useMedia from "@/hooks/useMedia";
import SenifitDialog from "@/components/SenifitDialog";

const Header = ({
  seconds,
  duration,
  onEnd,
  isEnd,
}: {
  duration: number;
  isEnd: boolean;
  onEnd: () => void;
  seconds: number;
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { isPhone, isTablet } = useMedia();

  const handleButtonClick = () => {
    if (isEnd) {
      onEnd();
    } else {
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        sx={{
          py: 3,
          px: 4.5,
          bgcolor: "background.paper",
        }}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            borderLeft: "4px solid",
            borderColor: "primary.main",
            pl: 1,
            py: 1,
          }}
        >
          <Typography
            variant={isPhone ? "Headline1" : "Heading1"}
            sx={{
              color: "labelVariants.normal",
            }}
          >
            {"수업 시간"}
          </Typography>
          <Timer
            duration={duration}
            seconds={seconds}
            variant={isPhone ? "Headline1" : isTablet ? "Title2" : "Title1"}
          />
        </Stack>
        {isPhone ? (
          <Button
            onClick={handleButtonClick}
            sx={{
              px: 2,
              py: 1,
              bgcolor: "fillVariants.negative",
              color: "statusVariants.negative",
            }}
          >
            <Typography variant={"Headline1"}>
              {isEnd ? "종료" : "중단"}
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={handleButtonClick}
            sx={{
              px: 8,
              py: 2,
              bgcolor: "fillVariants.negative",
              color: "statusVariants.negative",
              borderRadius: "0.75rem",
            }}
          >
            <Typography variant={"Heading1"}>
              {isEnd ? "수업 종료" : "수업 중단"}
            </Typography>
          </Button>
        )}
      </Stack>
      <SenifitDialog
        dialogType={"error"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title={"수업을 일찍 중단하시겠어요?"}
        body={"중단 시 수업 종료 화면으로 이동합니다."}
        primaryText={"수업 중단하기"}
        onPrimaryClick={onEnd}
        secondaryText={"수업 계속하기"}
        onSecondaryClick={() => setOpenDialog(false)}
      />
    </>
  );
};

export default Header;
