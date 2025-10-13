import React from "react";
import type { IMember } from "@/types/IMember";
import { Stack } from "@mui/material";
import ReturnButton from "@/components/ReturnButton";
import EditForm from "../../panel/EditForm";
import { createAxiosServer } from "@/apis/createAxiosServer";
import { IResponse } from "@/types/IResponse";
import { transformPayloadToValue } from "../../panel/transformData";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const axiosServer = await createAxiosServer();

  const {
    data: { data },
  } = await axiosServer.get<IResponse<IMember>>(`/centers/members/${id}`);

  const transformedData = transformPayloadToValue(data);

  return (
    <Stack spacing={[2, 3]}>
      <ReturnButton href={"/my-center/members"} />
      <EditForm isEdit defaultValues={transformedData} id={id} />
    </Stack>
  );
};

export default Page;
