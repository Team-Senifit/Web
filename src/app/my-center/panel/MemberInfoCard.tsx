"use client";

import CTAButton from "@/components/CTAButton";
import { SquareUserRoundIcon } from "@/components/icons";
import useMedia from "@/hooks/useMedia";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const MemberEditButton = () => {
  const { isPhone } = useMedia();
  return (
    <CTAButton
      fullWidth={isPhone}
      component={Link}
      href={"/my-center/members"}
      sx={{
        bgcolor: "fillVariants.colored",
      }}
      text="관리하기"
    />
  );
};

const Member = ({ name, age, grade, gender }: IMember) => {
  return (
    <Stack direction="row" spacing={[1, 2]} alignItems="center">
      <Typography variant="Heading1" sx={{ width: ["8rem", "8.25rem"] }}>
        {name}
      </Typography>
      <Stack direction="row" spacing={[2, 9]} alignItems="center">
        <Typography variant="Heading1" sx={{ width: ["3rem", "3.5rem"] }}>
          {age}세
        </Typography>
        <Typography variant="Heading1" sx={{ width: ["3rem", "3.5rem"] }}>
          {gender}
        </Typography>
        <Typography variant="Heading1" sx={{ width: ["6rem", "8rem"] }}>
          {grade}
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
      direction="column"
      justifyContent={["start", "space-between"]}
      alignItems={"start"}
      sx={{
        bgcolor: "background.paper",
        width: 1,
        height: ["16.25rem", "28rem"],
        borderRadius: [0, "0.75rem"],
        px: [3, 6],
        py: [3, 4.5],
      }}
    >
      <Stack direction="column" spacing={4} width={1}>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
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
          {!isPhone && <MemberEditButton />}
        </Stack>

        <Typography
          variant={isPhone ? "Headline1" : "Heading1"}
          sx={{ color: "label.normal", whiteSpace: "pre-line" }}
        >
          {"현재 등록된 어르신은\n"}
          <Typography
            component="span"
            variant={isPhone ? "Headline1" : "Heading1"}
            sx={{ color: "primaryVariants.default" }}
          >{`${count}명 `}</Typography>
          {"입니다."}
        </Typography>
      </Stack>

      {isPhone ? (
        <MemberEditButton />
      ) : (
        members.length !== 0 && (
          <Stack direction="column" spacing={[2, 1.5]}>
            {members.map((member, index) => (
              <Member {...member} />
            ))}
          </Stack>
        )
      )}
    </Stack>
  );
};

export default MemberInfoCard;
