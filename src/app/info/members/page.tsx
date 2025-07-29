import { Button, Container, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import MemberList from "./MemberList";
import Link from "next/link";

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
    <Container component={Stack} spacing={2}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>{"등록 어르신 관리하기"}</Typography>
        <Button
          variant="contained"
          href="/info/members/add"
          component={Link}
          startIcon={<AddIcon />}
        >
          {"어르신 추가하기"}
        </Button>
      </Stack>
      <MemberList members={memberData} />
      <Button
        variant="contained"
        href="/info"
        component={Link}
        sx={{ width: "fit-content" }}
      >
        <Typography>{"돌아가기"}</Typography>
      </Button>
    </Container>
  );
};

export default Page;
