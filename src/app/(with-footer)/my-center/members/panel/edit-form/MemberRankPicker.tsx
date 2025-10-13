"use client";
import { SenifitSelectField } from "@/components/SenifitSelect";
import SenifitToggleButtonGroup from "@/components/SenifitToggleButtonGroup";
import useMedia from "@/hooks/useMedia";
import type { IMemberEditFormValue, MemberRank } from "@/types/IMember";
import { ISenifitToggleOption } from "@/types/IToggleButton";
import React from "react";
import { Control } from "react-hook-form";

const MemberRankPicker = ({
  memberRank,
  setValue,
  memberRankOptions,
  control,
}: {
  memberRank: MemberRank;
  // eslint-disable-next-line
  setValue: (field: any, value: MemberRank) => void;
  memberRankOptions: ISenifitToggleOption<MemberRank>[];
  control: Control<IMemberEditFormValue>;
}) => {
  const { isPhone } = useMedia();

  if (isPhone) {
    return (
      <SenifitSelectField<IMemberEditFormValue, MemberRank>
        control={control}
        name={"memberRank"}
        options={memberRankOptions}
        placeholder={"등급 선택"}
        sx={{
          width: "10rem",
          height: "3.5rem",
        }}
      />
    );
  }
  return (
    <SenifitToggleButtonGroup<MemberRank>
      maxItemWidth={136}
      buttonProps={{
        sx: {
          minWidth: "8.5rem",
          flex: "unset",
          flexGrow: "unset",
          px: 6,
          wordBreak: "keep-all",
        },
      }}
      value={memberRank}
      onChange={(newValue) => {
        setValue("memberRank", newValue);
      }}
      exclusive
      options={memberRankOptions}
    />
  );
};

export default MemberRankPicker;
