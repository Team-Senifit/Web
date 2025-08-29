import axios from "axios";
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
  let centerName = "연동 실패";
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/centers`, {
  //     cache: "no-store",
  //   });
  //   if (res.ok) {
  //     const json = (await res.json()) as CenterAPI;
  //     centerName = json?.data?.name || centerName;
  //     console.log(centerName);
  //   }
  //   else {
  //     console.log("센터정보 api 연동 안됨");
  //   }
  // } catch {
  //   console.log("센터정보 api 연동 실패");
  // }

  // --------------------------------------------------------------
  // 하단 주석의 내용은 나중에 다시 주석 해제 해야함.
  // --------------------------------------------------------------
  // const { data } = await axios.get<CenterAPI>(
  //   `${process.env.NEXT_PUBLIC_API_URL}/centers`,
  //   { withCredentials: true }
  // );
  // centerName = data?.data?.name || centerName;
  // console.log(centerName);
  
  return (
    <Container max-width="lg" sx={{ py: 4 }}>
      {/* <Box>
        <Typography variant="h5" fontWeight={600}>
          {centerName} 님, 안녕하세요 :)
        </Typography>
      </Box> */}

      <Box mt={3}>
        <Record />
      </Box>
    </Container>
  );
}
