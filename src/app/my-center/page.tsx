import React from "react";
import InfoCard from "./panel/InfoCard";
import { Box, Button, Grid, Stack } from "@mui/material";
import MemberInfoCard from "./panel/MemberInfoCard";
import PageInfoCard from "./panel/PageInfoCard";
import { HouseIcon, MapPinHouseIcon } from "@/components/icons";
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
  {
    id: 4,
    name: "박지영",
    age: 68,
    grade: "인지지원등급",
    gender: "여성",
  },
  {
    id: 5,
    name: "최민수",
    age: 75,
    grade: "3등급",
    gender: "남성",
  },
];

// grid로 처리해도 되지만, 모바일, 테블릿에서 어떻게 나올지 몰라서 Stack으로 임시 처리
const Page = () => {
  return (
    <Box>
      <PageInfoCard />
      <Grid container spacing={[2, 3]} columns={14}>
        <Grid
          container
          size={{ phone: 14, desktop: 4 }}
          spacing={3}
          columns={14}
        >
          <Grid
            size={{
              phone: 14,
              tablet: 7,
              desktop: 14,
            }}
          >
            <InfoCard
              icon={
                <HouseIcon
                  sx={{ width: 24, height: 24, color: "label.neutral" }}
                  strokeWidth={2}
                />
              }
              title={"센터명"}
              content={"시니데이케어센터"}
            />
          </Grid>
          <Grid
            size={{
              phone: 14,
              tablet: 7,
              desktop: 14,
            }}
          >
            <InfoCard
              icon={
                <MapPinHouseIcon
                  sx={{ width: 24, height: 24, color: "label.neutral" }}
                  strokeWidth={2}
                />
              }
              title={"센터 위치"}
              content={"서울 광진구 능동로 123 2층"}
            />
          </Grid>
        </Grid>
        <Grid size={{ phone: 14, desktop: 10 }}>
          <MemberInfoCard count={memberData.length} members={memberData} />
        </Grid>
        {/* <Grid size={{ phone: 14, desktop: 10 }}>
          <Button
            variant="text"
            fullWidth={isPhone}
            component={Link}
            href={"/my-center/members"}
            sx={{
              bgcolor: "fillVariants.colored",
              py: 2,
              px: 8,
              borderRadius: "0.75rem",
            }}
          >
            <Typography variant={"Heading1"}>관리하기</Typography>
          </Button> */}
        {/* </Grid> */}
      </Grid>
    </Box>
  );
};

export default Page;
