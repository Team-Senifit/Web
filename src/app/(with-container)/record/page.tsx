import Record from "./panel/Record";
import { Box } from "@mui/material";

// type CenterAPI = {
//   status: number;
//   message: string;
//   data: { name: string };
// };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecordPage() {
  // const api = await createAxiosServer();
  // const { data } = await api.get("/centers");

  return (
    <Box>
      <Record />
    </Box>
  );
}
