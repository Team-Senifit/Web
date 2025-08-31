"use client";

import { Box, Divider, Stack } from "@mui/material";
import React from "react";
import MemberList from "./panel/MemberList";
import ReturnButton from "./panel/ReturnButton";
import PageInfoCard from "@/components/PageInfoCard";
import AddMemberButton from "./panel/AddMemberButton";
import useMedia from "@/hooks/useMedia";
import { SquareUserRoundIcon } from "@/components/icons";
import { IMember } from "@/types/IMember";
import { useSuspenseQuery } from "@tanstack/react-query";
import { IResponse } from "@/types/IResponse";

const Page = () => {
  const { isDesktop } = useMedia();
  const {
    data: { data: memberData },
  } = useSuspenseQuery<IResponse<Array<IMember>>>({
    queryKey: ["/centers/members"],
  });

  return (
    <Stack spacing={[2, 3]} sx={{ width: "100%", height: "100%" }}>
      <ReturnButton href={"/my-center"} />
      <Stack
        direction={"column"}
        justifyContent={"start"}
        alignItems={"start"}
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
