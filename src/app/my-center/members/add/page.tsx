import React from "react";
import EditForm from "../panel/EditForm";
import ReturnButton from "../panel/ReturnButton";
import { Stack } from "@mui/material";

const Page = () => {
  return (
    <Stack spacing={1.5}>
      <ReturnButton href="/my-center/members" />
      <EditForm />
    </Stack>
  );
};

export default Page;
