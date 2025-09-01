import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { createAxiosServer } from "@/apis/createAxiosServer";
import AllCenterHero from "./panel/AllCenterHero";
import AllRecords from "./panel/PastRecordsAll";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecordAllPage() {
  let centerName = "센터";
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    centerName = "김현수센터";
  } else {
    const api = await createAxiosServer();
    const { data } = await api.get("/centers");
    centerName = data?.data?.name ?? centerName;
  }

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ArrowBackIosNewRoundedIcon fontSize={"small"} />
        <Typography component={Link} href={"/record"} variant={"Heading1"}>
          {"돌아가기"}
        </Typography>
      </Box>

      <AllCenterHero centerName={centerName} />

      <AllRecords />
    </Box>
  );
}
