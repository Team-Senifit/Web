"use client";

import InfoCard from "./panel/InfoCard";
import { Box, Grid, Stack } from "@mui/material";
import MemberInfoCard from "./panel/MemberInfoCard";
import PageInfoCard from "./panel/PageInfoCard";
import { HouseIcon, MapPinHouseIcon } from "@/components/icons";
import CTAButton from "@/components/CTAButton";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";
import { IMyCenter } from "@/types/IMyCenter";
import { axiosClient } from "@/apis/axiosClient";
import { useRouter } from "next/navigation";
import SenifitDialog from "@/components/SenifitDialog";
import { useState } from "react";

const Page = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const { data } = useSuspenseQuery<IResponse<IMyCenter>>({
    queryKey: ["/centers"],
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axiosClient.get("/auth/signout");
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  return (
    <>
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
                content={data.data.name}
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
                content={data.data.location}
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
                onClick={() => {
                  setDialogOpen(true);
                }}
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
      <SenifitDialog
        dialogType={"error"}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={"로그아웃 하시겠습니까?"}
        body={"로그아웃 시 로그인 페이지로 이동합니다. "}
        primaryText={"로그아웃"}
        onPrimaryClick={() => {
          mutate();
          setDialogOpen(false);
        }}
        secondaryText={"돌아가기"}
        onSecondaryClick={() => setDialogOpen(false)}
      />
    </>
  );
};

export default Page;
