"use client";

import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ExercisePageInfoCard from "../../panel/ExercisePageInfoCard";
import PageInfoCard from "@/components/PageInfoCard";
import { SquareUserRoundIcon } from "@/components/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import MemberInfo from "./panel/MemberInfo";
import { IResponse } from "@/types/IResponse";
import { IMember } from "@/types/IMember";
import { Controller, useForm } from "react-hook-form";
import SenifitCheckbox from "@/components/SenifitCheckbox";
import useMedia from "@/hooks/useMedia";
import { useRouter } from "next/navigation";
import useProgramStore from "@/states/useProgramStore";
import Link from "next/link";

const Page = () => {
  const { isPhone, isDesktop } = useMedia();

  const router = useRouter();

  const {
    type,
    setSelectedMembers,
    setSelectedRoutineRecord,
    selectedRoutineRecord,
  } = useProgramStore();

  let returnPath = "";

  if (type) {
    if (Array.isArray(type)) {
      returnPath = `/exercise/thematic/${type[1]}`;
    } else {
      returnPath = `/exercise/${type}`;
    }
  }

  const {
    data: { data: memberData },
  } = useSuspenseQuery<IResponse<Array<IMember>>>({
    queryKey: ["/centers/members"],
  });

  const { control, watch, setValue, handleSubmit } = useForm<{
    members: number[];
  }>({});

  const selectedMembers = watch("members");

  const onSubmit = (data: { members: number[] }) => {
    if (!data.members?.length) {
      setSelectedMembers(null);
    } else {
      const selectedMembers = memberData.filter((m) =>
        data.members?.includes(m.memberId),
      );
      setSelectedMembers(selectedMembers);
      setSelectedRoutineRecord({
        ...selectedRoutineRecord!,
        participants: selectedMembers.map((m) => m.memberId),
      });
    }
    router.push("/exercise/check-selected");
  };

  return (
    <Stack direction={"column"} spacing={3}>
      <ExercisePageInfoCard
        title={"참여 어르신 선택하기"}
        description={"운동에 참여할 어르신을 선택해 주세요."}
      />
      <Stack
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        direction={"column"}
        spacing={3}
        p={[3, 6]}
        sx={{
          bgcolor: "background.paper",
          borderRadius: [undefined, "0.75rem"],
          width: "100%",
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
          endAction={
            <Stack direction={"row"} spacing={1}>
              <FormControlLabel
                sx={{
                  gap: 1,
                  px: 2,
                }}
                control={
                  <SenifitCheckbox
                    checked={memberData.length === selectedMembers?.length}
                    onChange={() => {
                      setValue(
                        "members",
                        memberData.map((m) => m.memberId),
                      );
                    }}
                    sx={{
                      padding: "0 !important",
                    }}
                  />
                }
                slotProps={{
                  typography: {
                    variant: "Title2",
                    sx: { color: "label.normal" },
                  },
                }}
                label={"전체 선택"}
              />
              <FormControlLabel
                sx={{
                  gap: 1,
                  px: 2,
                }}
                control={
                  <SenifitCheckbox
                    checked={selectedMembers?.length === 0}
                    onChange={() => {
                      setValue("members", []);
                    }}
                    sx={{
                      padding: "0 !important",
                    }}
                  />
                }
                slotProps={{
                  typography: {
                    variant: "Title2",
                    sx: { color: "label.normal" },
                  },
                }}
                label={"전체 해제"}
              />
            </Stack>
          }
          title={"참여 어르신 선택하기"}
        />
        {!isDesktop && (
          <Stack
            direction={"row"}
            width={"100%"}
            spacing={2}
            justifyContent={["flex-start", "flex-end"]}
          >
            <FormControlLabel
              sx={{
                gap: 1,
              }}
              control={
                <SenifitCheckbox
                  checked={memberData.length === selectedMembers?.length}
                  onChange={() => {
                    setValue(
                      "members",
                      memberData.map((m) => m.memberId),
                    );
                  }}
                  sx={{
                    padding: "0 !important",
                  }}
                />
              }
              slotProps={{
                typography: {
                  variant: "Headline1",
                  sx: { color: "label.normal" },
                },
              }}
              label={"전체 선택"}
            />
            <FormControlLabel
              sx={{
                gap: 1,
              }}
              control={
                <SenifitCheckbox
                  checked={selectedMembers?.length === 0}
                  onChange={() => {
                    setValue("members", []);
                  }}
                  sx={{
                    padding: "0 !important",
                  }}
                />
              }
              slotProps={{
                typography: {
                  variant: "Headline1",
                  sx: { color: "label.normal" },
                },
              }}
              label={"전체 해제"}
            />
          </Stack>
        )}
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Typography
          variant={isPhone ? "Headline1" : "Title2"}
          sx={{ color: "label.normal" }}
        >
          {"총 "}
          <Typography
            component={"span"}
            variant={isPhone ? "Headline1" : "Title2"}
            sx={{ color: "primary.main" }}
          >
            {selectedMembers?.length ?? 0}
          </Typography>
          {"명"}
        </Typography>
        <Controller
          name={"members"}
          control={control}
          render={({ field }) => {
            const selected = field.value ?? [];
            const toggle = (val: number) => {
              const exists = selected.includes(val);
              const next = exists
                ? selected.filter((x) => x !== val)
                : [...selected, val];
              field.onChange(next);
            };

            return (
              <FormControl
                component={"fieldset"}
                variant={"standard"}
                sx={{ width: "100%" }}
              >
                <Stack component={FormGroup} direction={"column"} spacing={3}>
                  {memberData.map((props) => (
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        "& .MuiFormControlLabel-label": {
                          width: "100%",
                        },
                        gap: 4,
                      }}
                      key={props.memberId}
                      control={
                        <SenifitCheckbox
                          checked={selected.includes(props.memberId)}
                          onChange={() => toggle(props.memberId)}
                          sx={{
                            padding: "0 !important",
                          }}
                        />
                      }
                      slots={{
                        typography: "div",
                      }}
                      slotProps={{
                        typography: {
                          sx: { width: "100%" },
                        },
                      }}
                      label={<MemberInfo {...props} />}
                    />
                  ))}
                </Stack>
              </FormControl>
            );
          }}
        />
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Stack direction={"row"} justifyContent={"space-between"} spacing={3}>
          <Button
            component={Link}
            href={returnPath}
            variant={"text"}
            sx={{
              flex: 1,
              bgcolor: "fillVariants.colored",
              borderRadius: "0.75rem",
              py: 2,
              maxWidth: "10.5rem",
            }}
          >
            <Typography variant={"Heading1"}>{"이전"}</Typography>
          </Button>
          <Button
            type={"submit"}
            variant={"contained"}
            color={"primary"}
            disableElevation
            sx={{
              flex: 1,
              borderRadius: "0.75rem",
              py: 2,
              maxWidth: "10.5rem",
            }}
          >
            <Typography variant={"Heading1"}>{"다음"}</Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Page;
