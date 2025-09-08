import { Grid, Box } from "@mui/material";
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
    <Grid spacing={3}>
      {/* 돌아가기: 모바일에서 좌우 24px 여백 + 버튼이 가로 100% */}
      <Box sx={{ px: { phone: 3, tablet: 0, desktop: 0 } }}>
        <Box sx={{ width: { phone: "100%", tablet: "auto", desktop: "auto" } }}>
          <ReturnButton href={"/record"} />
        </Box>
      </Box>

      <AllCenterHero centerName={centerName} />

      <PastRecordsAll all={all} />
    </Grid>
  );
}
