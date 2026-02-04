import { Stack } from "@mui/material";
import RecentRecordSection from "./panel/RecentRecordSection";
import PastRecordsSection from "./panel/PastRecordsSection";
import { createAxiosServer } from "@/apis/createAxiosServer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthError } from "@/apis/errors";

export default async function Record() {
  const cookie = (await headers()).get("cookie") ?? "";
  if (!cookie) {
    redirect("/login?next=%2Frecord");
  }

  const api = await createAxiosServer();
  try {
    await api.get("/records");
  } catch (e) {
    if (isAuthError(e)) redirect("/login?next=%2Frecord");
    throw e;
  }

  return (
    <Stack spacing={3}>
      <RecentRecordSection />
      <PastRecordsSection />
    </Stack>
  );
}
