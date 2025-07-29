import React from "react";
import InfoCard from "./panel/InfoCard";
import { Container, Stack, Typography } from "@mui/material";
import MemberInfoCard from "./panel/MemberInfoCard";

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

// grid로 처리해도 되지만, 모바일, 테블릿에서 어떻게 나올지 몰라서 Stack으로 임시 처리
const Page = () => {
  return (
    <Container>
      <Typography>{"안녕하세요."}</Typography>
      <Typography>{"센터 정보를 관리해보세요!"}</Typography>
      <Stack spacing={2} direction={"row"}>
        <Stack spacing={2} direction={"column"}>
          <InfoCard title={"센터명"} content={"시니데이케어센터"} />
          <InfoCard title={"센터 위치"} content={"서울시 강남구"} />
        </Stack>
        <MemberInfoCard count={memberData.length} members={memberData} />
      </Stack>
    </Container>
  );
};

export default Page;
