import SenifitHeader from "@/components/SenifitHeader";
import SenifitNavBar from "@/components/SenifitNavBar";
import Container from "@mui/material/Container";
import Footer from "./panel/Footer";
import { Stack } from "@mui/material";

export default function WithContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SenifitHeader />
      <Stack direction={"column"} sx={{ minHeight: "100vh" }}>
        <Container
          maxWidth={"desktop"}
          sx={{
            pt: [9, 12, 20.75],
            px: [0, 3],
            pb: [14, 15, 6],
            boxSizing: "border-box",
            flexGrow: 1,
          }}
        >
          {children}
        </Container>
        <Footer />
      </Stack>
      <SenifitNavBar />
    </>
  );
}
