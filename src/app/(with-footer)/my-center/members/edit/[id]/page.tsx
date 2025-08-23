import React from "react";
import dayjs from "dayjs";
import {
  IMemberEditFormPayload,
  IMemberEditFormValue,
} from "@/types/IMemberEdit";
import { Stack } from "@mui/material";
import ReturnButton from "../../panel/ReturnButton";
import EditForm from "../../panel/EditForm";

const transformPayloadToValue = (
  payload: IMemberEditFormPayload
): IMemberEditFormValue => {
  return {
    ...payload,
    year: dayjs(payload.birthDate).year(),
    month: dayjs(payload.birthDate).month() + 1,
    day: dayjs(payload.birthDate).date(),
  };
};

const transformValueToPayload = (
  value: IMemberEditFormValue
): IMemberEditFormPayload => {
  return {
    ...value,
    birthDate: dayjs()
      .year(value?.year ? value.year : 2000)
      .month(value?.month ? value.month - 1 : 0)
      .date(value?.day ? value.day : 1)
      .format("YYYY-MM-DD"),
  };
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data: IMemberEditFormPayload = {
    name: "홍길동",
    birthDate: "1965-01-01",
    memberRank: 1,
    isSolar: true,
    gender: 2,
  };

  return (
    <Stack spacing={[2, 3]}>
      <ReturnButton href="/my-center/members" />
      <EditForm isEdit defaultValues={transformPayloadToValue(data)} />
    </Stack>
  );
};

export default Page;
