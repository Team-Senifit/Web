import { Box } from "@mui/material";
import { getCenterName } from "../panel/server/getCenter";
import { getRecordsServer } from "../panel/server/getRecords";
import AllCenterHero from "./panel/AllCenterHero";
import PastRecordsAll from "./panel/PastRecordsAll";
import ReturnButton from "@/components/ReturnButton";

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
