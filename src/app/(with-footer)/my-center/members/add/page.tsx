import React from "react";
import EditForm from "../panel/EditForm";
import ReturnButton from "@/components/ReturnButton";
import { Stack } from "@mui/material";

const Page = () => {
  return (
    <Stack spacing={1.5} pb={3}>
      <ReturnButton href={"/my-center/members"} />
      <EditForm
        defaultValues={{
          isSolar: true,
        }}
      />
    </Stack>
  );
};

export default Page;
