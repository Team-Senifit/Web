"use client";

import { axiosClient } from "@/apis/axiosClient";
import SenifitDialog from "@/components/SenifitDialog";
import useMedia from "@/hooks/useMedia";
import { genderLabel, gradeLabel, IMember } from "@/types/IMember";
import { calculateAge } from "@/utils/calculateAge";
import { Button, Stack, Typography } from "@mui/material";
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import EmptyView from "./EmptyView";

const Member = ({
  memberId: id,
  name,
  birthDate,
  memberRank,
  gender,
  isDesktop,
  mutate,
}: IMember & {
  isDesktop: boolean;
  mutate: UseMutateFunction<void, Error, number, unknown>;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Stack
        direction={{ phone: "column", tablet: "row" }}
        spacing={2}
        alignItems={"center"}
        justifyContent={["center", "space-between"]}
        width={1}
      >
        <Stack
          direction={{ phone: "column", desktop: "row" }}
          alignItems={"start"}
          spacing={1}
          width={1}
        >
          <Typography
            variant={isDesktop ? "Title2" : "Headline1"}
            title={name}
            sx={{
              color: "label.normal",
              width: "8.25rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography
              variant={isDesktop ? "Heading1" : "Headline1"}
              sx={{
                color: "label.neutral",
                width: { phone: "3rem", desktop: "3.5rem" },
              }}
            >
              {`${calculateAge(dayjs(birthDate))}세`}
            </Typography>
            <Typography
              variant={isDesktop ? "Heading1" : "Headline1"}
              sx={{
                color: "label.neutral",
                width: { phone: "3rem", desktop: "3.5rem" },
              }}
            >
              {genderLabel[gender]}
            </Typography>
            <Typography
              variant={isDesktop ? "Heading1" : "Headline1"}
              sx={{
                color: "label.neutral",
                width: { phone: "6rem", desktop: "8rem" },
              }}
            >
              {gradeLabel[memberRank]}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          spacing={1}
          width={[1, "55%"]}
          justifyContent={"flex-end"}
        >
          <Button
            variant={"text"}
            component={Link}
            href={`/my-center/members/edit/${id}`}
            sx={{
              color: "label.neutral",
              bgcolor: "fillVariants.normal",
              py: 1,
              px: 2,
              width: [1, "fit-content"],
              borderRadius: "9999px",
              wordBreak: "keep-all",
              height: "2.5rem",
            }}
          >
            <Typography variant={"Headline1"}>{"수정하기"}</Typography>
          </Button>
          <Button
            variant={"text"}
            onClick={() => {
              setDialogOpen(true);
            }}
            sx={{
              color: "statusVariants.negative",
              bgcolor: "fillVariants.negative",
              py: 1,
              px: 2,
              width: [1, "fit-content"],
              borderRadius: "9999px",
              wordBreak: "keep-all",
              height: "2.5rem",
            }}
          >
            <Typography variant={"Headline1"}>{"삭제하기"}</Typography>
          </Button>
        </Stack>
      </Stack>

      <SenifitDialog
        dialogType={"error"}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={`[${name}] 어르신 정보를\n삭제 하시겠습니까?`}
        body={"삭제 후에는 다시 복구되지 않습니다."}
        primaryText={"삭제하기"}
        onPrimaryClick={() => {
          mutate(id);
          setDialogOpen(false);
        }}
        secondaryText={"돌아가기"}
        onSecondaryClick={() => setDialogOpen(false)}
      />
    </>
  );
};

const MemberList = ({ members }: { members: Array<IMember> }) => {
  const { isDesktop } = useMedia();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      await axiosClient.delete(`/centers/members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/centers/members"] });
      queryClient.invalidateQueries({ queryKey: ["/centers"] });
    },
  });

  return (
    <>
      {members.map((member) => (
        <Member
          key={member.memberId}
          isDesktop={isDesktop}
          mutate={mutate}
          {...member}
        />
      ))}
      {members.length === 0 && <EmptyView />}
    </>
  );
};

export default MemberList;
