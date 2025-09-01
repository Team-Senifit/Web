import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { createAxiosServer } from "@/apis/createAxiosServer";
import AllCenterHero from "./panel/AllCenterHero";
import AllRecords from "./panel/PastRecordsAll";
import BackIcon from "@/components/icons/BackIcon";

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
      <Box
        component={Link}
        href={"/record"}
        role={"button"}
        aria-label={"돌아가기"}
        sx={{
          width: "205px",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: "50px",
          py: 2,
          borderRadius: 1.5,
          bgcolor: "background.paper",
          boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
          textDecoration: "none",
          alignSelf: "start",
        }}
      >
        <Typography variant={"Heading1"} color={"text.secondary"}>
          {"돌아가기"}
        </Typography>
        <BackIcon />
      </Box>

      <AllCenterHero centerName={centerName} />
      <AllRecords />
    </Box>
  );
}
