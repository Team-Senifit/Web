import Record from "./panel/Record";
import { Typography, Container, Box } from "@mui/material";
import { createAxiosServer } from "@/apis/createAxiosServer";

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
  const { data } = await api.get("/centers");
  centerName = data?.data?.name || centerName;
  console.log(centerName);

  return (
    <Container max-width={"lg"} sx={{ py: 4 }}>
      <Box>
        <Typography variant={"h5"} fontWeight={600}>
          {`${centerName} 님, 안녕하세요 :)`}
        </Typography>
      </Box>

      <Box mt={3}>
        <Record />
      </Box>
    </Container>
  );
}
