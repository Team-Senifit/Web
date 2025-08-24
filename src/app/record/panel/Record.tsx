"use client";

import { Stack } from "@mui/material";
import RecentRecord from "./RecentRecord";
import PastRecords from "./PastRecords";

export default function Record() {
  return (
    <Stack spacing={3}>
      <RecentRecord />
      <PastRecords />
    </Stack>
  );
}
