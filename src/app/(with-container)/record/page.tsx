import Record from "./panel/Record";
import { Typography, Box } from "@mui/material";
import { createAxiosServer } from "@/apis/createAxiosServer";
import { isAuthError } from "@/apis/errors";
import { redirect } from "next/navigation";

// type CenterAPI = {
//   status: number;
//   message: string;
//   data: { name: string };
// };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecordPage() {
  let centerName = "연동 실패";

  const api = await createAxiosServer();

  try {
    const { data } = await api.get("/centers");
    centerName = data?.data?.name || centerName;

    return (
      <>
        <Box>
          <Typography variant={"h5"} fontWeight={600}>
            {`${centerName} 님, 안녕하세요 :)`}
          </Typography>
        </Box>

        <Box mt={3}>
          <Record />
        </Box>
      </>
    );
  } catch (e) {
    if (isAuthError(e)) {
      redirect(`/login?next=${encodeURIComponent("/record")}`);
    }
    throw e;
  }
}
