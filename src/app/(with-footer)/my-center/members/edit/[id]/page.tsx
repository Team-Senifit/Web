import React from "react";
import dayjs from "dayjs";
import type {
  IMember,
  IMemberEditFormPayload,
  IMemberEditFormValue,
} from "@/types/IMember";
import { Stack } from "@mui/material";
import ReturnButton from "../../panel/ReturnButton";
import EditForm from "../../panel/EditForm";
import { createAxiosServer } from "@/apis/createAxiosServer";
import { IResponse } from "@/types/IResponse";

const transformPayloadToValue = (
  payload: IMemberEditFormPayload,
): IMemberEditFormValue => {
  return {
    ...payload,
    year: dayjs(payload.birthDate).year(),
    month: dayjs(payload.birthDate).month() + 1,
    day: dayjs(payload.birthDate).date(),
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transformValueToPayload = (
  value: IMemberEditFormValue,
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

  const axiosServer = await createAxiosServer();

  const {
    data: { data },
  } = await axiosServer
    .get<IResponse<IMember>>(`/members/${id}`)
    .catch((error) => {
      console.error("Error fetching member data:", error);
      return { data: { data: null } };
    });
  if (!data) return null;

  const transformedData = transformPayloadToValue(data);

  return (
    <Stack spacing={[2, 3]}>
      <ReturnButton href={"/my-center/members"} />
      <EditForm isEdit defaultValues={transformedData} />
    </Stack>
  );
};

export default Page;
