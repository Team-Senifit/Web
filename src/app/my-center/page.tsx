"use client";

import React from "react";
import InfoCard from "./panel/InfoCard";
import { Box, Button, Grid, Stack } from "@mui/material";
import MemberInfoCard from "./panel/MemberInfoCard";
import PageInfoCard from "./panel/PageInfoCard";
import { HouseIcon, MapPinHouseIcon } from "@/components/icons";
import CTAButton from "@/components/CTAButton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";
import { IMyCenter } from "@/types/IMyCenter";

const Page = () => {
  const { data } = useSuspenseQuery<IResponse<IMyCenter>>({
    queryKey: ["/centers"],
  });
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
              title={data.data.name}
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
          <MemberInfoCard
            count={data.data.memberCount}
            members={data.data.members}
          />
        </Grid>
        <Grid
          size={{ phone: 14 }}
          sx={{
            px: [3, 0],
            justifyContent: "flex-end",
          }}
        >
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <CTAButton
              text={"로그아웃"}
              sx={{
                width: ["100%", "fit-content"],
                bgcolor: "fillVariants.negative",
                color: "error.main",
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
