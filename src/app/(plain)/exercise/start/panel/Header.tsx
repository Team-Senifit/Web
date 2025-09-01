"use client";

import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Timer from "./Timer";
import useMedia from "@/hooks/useMedia";

const Header = ({ duration }: { duration: number }) => {
  const { isPhone, isTablet } = useMedia();

  const [seconds, setSeconds] = useState<number>(0);

  return (
    <Stack
      direction={"row"}
      sx={{
        py: 3,
        px: 4.5,
        bgcolor: "background.paper",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
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
          setSeconds={setSeconds}
          variant={isPhone ? "Headline1" : isTablet ? "Title2" : "Title1"}
        />
      </Stack>
      {isPhone ? (
        <Button
          sx={{
            px: 2,
            py: 1,
            bgcolor: "fillVariants.negative",
            color: "statusVariants.negative",
          }}
        >
          <Typography variant={"Headline1"}>{"종료"}</Typography>
        </Button>
      ) : (
        <Button
          sx={{
            px: 8,
            py: 2,
            bgcolor: "fillVariants.negative",
            color: "statusVariants.negative",
            borderRadius: "0.75rem",
          }}
        >
          <Typography variant={"Heading1"}>{"수업 중단"}</Typography>
        </Button>
      )}
    </Stack>
  );
};

export default Header;
