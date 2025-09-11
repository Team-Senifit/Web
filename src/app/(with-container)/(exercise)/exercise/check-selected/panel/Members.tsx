import CTAButton from "@/components/CTAButton";
import { SquareUserRoundIcon } from "@/components/icons";
import PageInfoCard from "@/components/PageInfoCard";
import useMedia from "@/hooks/useMedia";
import { genderLabel, gradeLabel, IMember } from "@/types/IMember";
import { calculateAge } from "@/utils/calculateAge";
import { Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

const Members = ({ selectedMembers }: { selectedMembers: IMember[] }) => {
  const { isPhone, isDesktop } = useMedia();

  const SelectMemberAgainButton = () => {
    return (
      <CTAButton
        href={"/exercise/members"}
        variant={"text"}
        text={"참여 어르신 다시 선택하기"}
        sx={{
          bgcolor: "fillVariants.colored",
          wordBreak: "keep-all",
          px: [0, 0, 8],
        }}
      />
    );
  };
  return (
    <Stack
      direction={"column"}
      spacing={3}
      p={[3, 6]}
      sx={{
        bgcolor: "background.paper",
        borderRadius: [undefined, "0.75rem"],
      }}
    >
      <PageInfoCard
        icon={
          <SquareUserRoundIcon
            strokeWidth={2}
            sx={{
              color: "label.neutral",
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        }
        endAction={<SelectMemberAgainButton />}
        title={"센터 정보"}
      />
      <Divider sx={{ borderColor: "borderVariants.normal" }} />
      <Typography variant={!isPhone ? "Title2" : "Headline1"}>
        {"참여인원 총 "}
        <Typography
          component={"span"}
          variant={!isPhone ? "Title2" : "Headline1"}
          sx={{ color: "primary.main" }}
        >
          {selectedMembers?.length ?? 0}
        </Typography>
        {"명"}
      </Typography>
      <Typography
        variant={!isPhone ? "Heading1" : "Headline1"}
        sx={{
          color: "labelVariants.neutral",
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {selectedMembers?.map((member, idx) => {
          return `${member.name}(${calculateAge(
            dayjs(member.birthDate),
          )}/${genderLabel[member.gender]}/${gradeLabel[member.memberRank]})${
            idx === selectedMembers.length - 1 ? "" : ", "
          }`;
        })}
      </Typography>
      {!isDesktop && <SelectMemberAgainButton />}
    </Stack>
  );
};

export default Members;
