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

const Page = () => {
  const {
    data: { data: memberData },
  } = useSuspenseQuery<IResponse<Array<IMember>>>({
    queryKey: ["/centers/members"],
  });

  const { control, watch, setValue } = useForm<{ members: number[] }>({});

  const selectedMembers = watch("members");

  return (
    <Stack direction={"column"} spacing={3}>
      <ExercisePageInfoCard
        title={"참여 어르신 선택하기"}
        description={"운동에 참여할 어르신을 선택해 주세요."}
      />
      <Stack
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
          title={"참여 어르신 선택하기"}
        />
        <Stack direction={"row"} width={"100%"} spacing={2}>
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
        <Divider sx={{ borderColor: "borderVariants.normal" }} />
        <Controller
          name={"members"}
          control={control}
          rules={{
            validate: (v) => v.length >= 1 || "최소 1개 이상 선택해 주세요",
          }}
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
            variant={"text"}
            color={"primary"}
            sx={{
              flex: 1,
              bgcolor: "fillVariants.colored",
              borderRadius: "0.75rem",
              py: 2,
              maxWidth: "10.5rem",
            }}
            onClick={() => {
              // Handle button click
            }}
          >
            <Typography variant={"Heading1"}>{"이전"}</Typography>
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            disableElevation
            sx={{
              flex: 1,
              borderRadius: "0.75rem",
              py: 2,
              maxWidth: "10.5rem",
            }}
            onClick={() => {
              // Handle button click
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
