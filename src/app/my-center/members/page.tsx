import { Button, Divider, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import MemberList from "./panel/MemberList";
import Link from "next/link";
import ReturnButton from "./panel/ReturnButton";
import PageInfoCard from "./panel/PageInfoCard";

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
  return (
    <Stack spacing={2} sx={{ width: "100%", height: "100%" }}>
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
        }}
      >
        <PageInfoCard />
        <Divider
          sx={{ borderColor: "#f2f2f2", borderBottomWidth: "2px", width: 1 }}
        />
        <MemberList members={memberData} />
      </Stack>
    </Stack>
  );
};

export default Page;
