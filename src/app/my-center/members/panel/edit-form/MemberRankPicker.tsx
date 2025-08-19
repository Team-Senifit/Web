"use client";
import { SenifitSelectField } from "@/components/SenifitSelect";
import SenifitToggleButtonGroup from "@/components/SenifitToggleButtonGroup";
import useMedia from "@/hooks/useMedia";
import type { IMemberEditFormValue, MemberRank } from "@/types/IMemberEdit";
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
        sx={{
          width: "10rem",
          height: "3.5rem",
        }}
      />
    );
  }
  return (
    <SenifitToggleButtonGroup<MemberRank>
      groupProps={{
        sx: {
          flexWrap: "wrap",
          gap: 2,
          maxWidth: "50rem",
        },
      }}
      buttonProps={{
        sx: {
          minWidth: "8.5rem",
          flex: "unset",
          flexGrow: "unset",
          width: "fit-content !important",
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
