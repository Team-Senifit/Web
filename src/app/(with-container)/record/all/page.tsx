import { Box } from "@mui/material";
import { getCenterName } from "../_server/getCenter";
import { getRecordsServer } from "../_server/getRecords";
import AllCenterHero from "./panel/AllCenterHero";
import PastRecordsAll from "./panel/PastRecordsAll";
import ReturnButton from "@/app/(with-footer)/my-center/members/panel/ReturnButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecordAllPage() {
  const centerName = await getCenterName();
  const all = await getRecordsServer();

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <ReturnButton href={"/record"} />
      <AllCenterHero centerName={centerName} />
      <PastRecordsAll all={all} />
    </Box>
  );
}
