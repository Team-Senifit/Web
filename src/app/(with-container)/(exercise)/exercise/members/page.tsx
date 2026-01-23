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
import React, { useEffect, useMemo, useRef, useState } from "react";
import GradationPageInfoCard from "../../../../../components/GradationPageInfoCard";
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
import SenifitDialog from "@/components/SenifitDialog";

const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { isPhone, isDesktop } = useMedia();

  const router = useRouter();

  const {
    type,
    hasHydrated,
    selectedMembers: storedSelectedMembers,
    setSelectedMembers,
    setSelectedRoutineRecord,
    selectedRoutineRecord,
  } = useProgramStore();

  const storedMemberIds = useMemo(
    () => storedSelectedMembers.map((m) => m.memberId),
    [storedSelectedMembers],
  );

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
  }>({
    defaultValues: {
      // 체크 페이지에서 돌아왔을 때 기존 선택 복원
      members: storedMemberIds,
    },
  });

  // zustand persist rehydrate 이후에도 폼이 초기화되지 않도록 1회 동기화
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    if (storedMemberIds.length === 0) return;
    setValue("members", storedMemberIds, { shouldDirty: false });
    didInitRef.current = true;
  }, [storedMemberIds, setValue]);

  const selectedMembers = watch("members");

  // rehydrate 전엔 이전 선택이 비어 보일 수 있어, 실수로 '다음'을 눌러 선택이 초기화되는 문제를 방지
  if (!hasHydrated) return null;

  const onSubmit = (data: { members: number[] }) => {
    if (!data.members?.length) {
      setSelectedMembers([]);
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
    setOpenDialog(false);
    router.push("/exercise/check-selected");
  };

  return (
    <>
      <Stack direction={"column"} spacing={3}>
        <GradationPageInfoCard
          title={"참여 어르신 선택하기"}
          description={"운동에 참여할 어르신을 선택해 주세요."}
        />
        <Stack
          id={"member-selection-form"}
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
                      checked={
                        memberData.length === selectedMembers?.length &&
                        memberData.length > 0
                      }
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
                    checked={
                      memberData.length === selectedMembers?.length &&
                      memberData.length > 0
                    }
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
                    {memberData.length === 0 && (
                      <Stack justifyContent={"center"} alignItems={"center"}>
                        <Typography
                          variant={isPhone ? "Headline1" : "Heading1"}
                          sx={{ color: "label.alternative" }}
                        >
                          {"등록된 어르신이 없습니다."}
                        </Typography>
                      </Stack>
                    )}
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
              onClick={() => setOpenDialog(true)}
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
      <SenifitDialog
        dialogType={"success"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        title={`선택한 어르신은 총 ${selectedMembers.length}명 입니다.\n이대로 진행할까요?`}
        primaryText={"네, 선택할게요"}
        primaryButtonProps={{
          type: "submit",
          form: "member-selection-form",
        }}
        secondaryText={"다시 선택"}
        onSecondaryClick={() => setOpenDialog(false)}
      />
    </>
  );
};

export default Page;
