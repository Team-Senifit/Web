"use client";

import useMedia from "@/hooks/useMedia";
import { Button, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Member = ({
  id,
  name,
  age,
  grade,
  gender,
  isDesktop,
}: IMember & { isDesktop: boolean }) => {
  return (
    <Stack
      direction={{ phone: "column", tablet: "row" }}
      spacing={2}
      alignItems="center"
      justifyContent={["center", "space-between"]}
      width={1}
    >
      <Stack
        direction={{ phone: "column", desktop: "row" }}
        alignItems="start"
        spacing={1}
        width={1}
      >
        <Typography
          variant={isDesktop ? "Title2" : "Headline1"}
          sx={{ color: "label.normal", width: "8.25rem" }}
        >
          {name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant={isDesktop ? "Heading1" : "Headline1"}
            sx={{
              color: "label.neutral",
              width: { phone: "3rem", desktop: "3.5rem" },
            }}
          >
            {age}세
          </Typography>
          <Typography
            variant={isDesktop ? "Heading1" : "Headline1"}
            sx={{
              color: "label.neutral",
              width: { phone: "3rem", desktop: "3.5rem" },
            }}
          >
            {gender}
          </Typography>
          <Typography
            variant={isDesktop ? "Heading1" : "Headline1"}
            sx={{
              color: "label.neutral",
              width: { phone: "6rem", desktop: "8rem" },
            }}
          >
            {grade}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        width={[1, "55%"]}
        justifyContent="flex-end"
      >
        <Button
          variant="text"
          component={Link}
          href={`/my-center/members/edit/${id}`}
          sx={{
            color: "label.neutral",
            bgcolor: "fillVariants.normal",
            py: 1,
            px: 2,
            width: [1, "fit-content"],
            borderRadius: "9999px",
          }}
        >
          수정하기
        </Button>
        <Button
          variant="text"
          sx={{
            color: "statusVariants.negative",
            bgcolor: "fillVariants.negative",
            py: 1,
            px: 2,
            width: [1, "fit-content"],
            borderRadius: "9999px",
          }}
        >
          삭제하기
        </Button>
      </Stack>
    </Stack>
  );
};

const MemberList = ({ members }: { members: Array<IMember> }) => {
  const { isDesktop } = useMedia();
  return (
    <>
      {members.map((member) => (
        <Member key={member.id} isDesktop={isDesktop} {...member} />
      ))}
    </>
  );
};

export default MemberList;
