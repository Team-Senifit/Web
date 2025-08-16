import Record from "./panel/Record";
import { Typography, Container, Box } from "@mui/material";

type CenterAPI = {
  status: number;
  message: string;
  data: { name: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RecordPage() {
  let centerName = "시니데이케어센터";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/center`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = (await res.json()) as CenterAPI;
      centerName = json?.data?.name || centerName;
      console.log(centerName);
    }
    else {
      console.log("센터정보 api 연동 안됨");
    }
  } catch {
    console.log("센터정보 api 연동 실패");
  }
  
  return (
    <Container max-width="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h5" fontWeight={600}>
          {centerName} 님, 안녕하세요 :)
        </Typography>
      </Box>

      <Box mt={3}>
        <Record />
      </Box>
    </Container>
  );
}
