"use client";

import { SquareUserRoundIcon } from "@/components/icons";
import useMedia from "@/hooks/useMedia";
import { gradeLabel, type IMember } from "@/types/IMember";
import { calculateAge } from "@/utils/calculateAge";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import EmptyView from "./EmptyView";

const MemberEditButton = ({ disabled }: { disabled: boolean }) => {
  const { isPhone } = useMedia();
  return (
    <Button
      component={Link}
      variant={"text"}
      href={"/my-center/members"}
      disabled={disabled}
      fullWidth={isPhone}
      sx={{
        py: 2,
        px: 8,
        borderRadius: "0.75rem",
        bgcolor: "fillVariants.colored",
      }}
    >
      <Typography
        variant={"Heading1"}
        sx={{ color: disabled ? "primary.light" : "primary.main" }}
      >
        {"관리하기"}
      </Typography>
    </Button>
  );
};

const Member = ({ name, birthDate, memberRank, gender }: IMember) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const age = isMounted ? calculateAge(dayjs(birthDate)) : "";
  return (
    <Stack direction={"row"} spacing={[1, 2]} alignItems={"center"}>
      <Typography
        variant={"Heading1"}
        sx={{
          width: ["8rem", "8.25rem"],
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Typography>
      <Stack direction={"row"} spacing={[2, 9]} alignItems={"center"}>
        <Typography variant={"Heading1"} sx={{ width: ["3rem", "3.5rem"] }}>
          {age}
          {"세"}
        </Typography>
        <Typography variant={"Heading1"} sx={{ width: ["3rem", "3.5rem"] }}>
          {gender}
        </Typography>
        <Typography variant={"Heading1"} sx={{ width: ["6rem", "8rem"] }}>
          {gradeLabel[memberRank]}
        </Typography>
      </Stack>
    </Stack>
  );
};

const MemberInfoCard = ({
  count,
  members,
}: {
  count: number;
  members: Array<IMember>;
}) => {
  const { isPhone } = useMedia();
  return (
    <Stack
      component={"section"}
      spacing={[2, 0]}
      direction={"column"}
      justifyContent={["start", "space-between"]}
      alignItems={"start"}
      sx={{
        bgcolor: "background.paper",
        boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
        width: 1,
        minHeight: ["16.25rem", "28rem"],
        borderRadius: [0, "0.75rem"],
        px: [3, 6],
        py: [3, 4.5],
      }}
    >
      <Stack direction={"column"} spacing={4} width={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={1}
        >
          <Stack
            direction={"column"}
            spacing={1}
            alignItems={"start"}
            justifyContent={"center"}
          >
            <SquareUserRoundIcon
              sx={{ width: 24, height: 24, color: "label.neutral" }}
              strokeWidth={2}
            />
            <Typography
              variant={isPhone ? "Headline1" : "Heading1"}
              sx={{ color: "label.neutral" }}
            >
              {"센터인원"}
            </Typography>
          </Stack>
          {!isPhone && <MemberEditButton disabled={members.length === 0} />}
        </Stack>

        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: "label.normal", whiteSpace: "pre-line" }}
        >
          {"현재 등록된 어르신은\n"}
          <Typography
            component={"span"}
            variant={isPhone ? "Headline1" : "Heading1"}
            sx={{ color: "primaryVariants.default" }}
          >{`${count}명 `}</Typography>
          {"입니다."}
        </Typography>
      </Stack>
      {members.length === 0 && <EmptyView />}

      {isPhone ? (
        <MemberEditButton disabled={members.length === 0} />
      ) : (
        members.length !== 0 && (
          <Stack direction={"column"} spacing={[2, 1.5]}>
            {members.map((member, index) => (
              <Member {...member} key={index} />
            ))}
          </Stack>
        )
      )}
    </Stack>
  );
};

export default MemberInfoCard;
