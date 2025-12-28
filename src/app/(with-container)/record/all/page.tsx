import { Box } from "@mui/material";
import { getCenterName } from "../panel/server/getCenter";
import { getRecordsServer } from "../panel/server/getRecords";
import AllCenterHero from "./panel/AllCenterHero";
import PastRecordsAll from "./panel/PastRecordsAll";
import ReturnButton from "@/components/ReturnButton";
import { isAuthError } from "@/apis/errors";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecordAllPage() {
  try {
    const centerName = await getCenterName();
    const all = await getRecordsServer();

    return (
      <Box sx={{ display: "grid", gap: 3 }}>
        {/* 돌아가기: 모바일에서 좌우 24px 여백 + 버튼이 가로 100% */}
        <Box sx={{ px: { phone: 3, tablet: 0, desktop: 0 } }}>
          <Box
            sx={{ width: { phone: "100%", tablet: "auto", desktop: "auto" } }}
          >
            <ReturnButton href={"/record"} />
          </Box>
        </Box>

        <AllCenterHero centerName={centerName} />

        <PastRecordsAll all={all} />
      </Box>
    );
  } catch (e) {
    if (isAuthError(e)) {
      const next = encodeURIComponent("/record/all");
      redirect(`/login?next=${next}`);
    }
    throw e;
  }
}
