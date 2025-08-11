"use client";

import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import MemberList from "./panel/MemberList";
import ReturnButton from "./panel/ReturnButton";
import PageInfoCard from "@/components/PageInfoCard";
import AddMemberButton from "./panel/AddMemberButton";
import useMedia from "@/hooks/useMedia";
import { SquareUserRoundIcon } from "@/components/icons";

const memberData: Array<IMember> = [
  {
    id: 1,
    name: "홍길동",
    age: 70,
    grade: "인지지원등급",
    gender: "남성",
  },
  {
    id: 2,
    name: "김영희",
    age: 65,
    grade: "1등급",
    gender: "여성",
  },

  {
    id: 3,
    name: "이철수",
    age: 72,
    grade: "2등급",
    gender: "남성",
  },
];

const Page = () => {
  const { isDesktop } = useMedia();
  return (
    <Stack spacing={[2, 3]} sx={{ width: "100%", height: "100%" }}>
      <ReturnButton />
      <Stack
        direction={"column"}
        justifyContent="start"
        alignItems="start"
        spacing={[2, 3]}
        sx={{
          width: 1,
          bgcolor: "background.paper",
          p: [3, 6],
          borderRadius: [0, "0.75rem"],
        }}
      >
        <PageInfoCard
          icon={
            <SquareUserRoundIcon
              strokeWidth={2}
              sx={{ color: "label.neutral" }}
            />
          }
          title={"등록 어르신 관리하기"}
          endAction={<AddMemberButton />}
        />
        <Divider
          sx={{ borderColor: "#f2f2f2", borderBottomWidth: "2px", width: 1 }}
        />
        <MemberList members={memberData} />
      </Stack>
      {!isDesktop && (
        <Box
          sx={{
            px: ["1.5rem", 0],
          }}
        >
          <AddMemberButton />
        </Box>
      )}
    </Stack>
  );
};

export default Page;
