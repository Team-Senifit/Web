import SenifitHeader from "@/components/SenifitHeader";
import SenifitNavBar from "@/components/SenifitNavBar";
import Container from "@mui/material/Container";
import Footer from "./panel/Footer";

export default function WithContainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SenifitHeader />
      <Container
        maxWidth="desktop"
        sx={{
          pt: [9, 12, 20.75],
          px: [0, 3],
          pb: [11, 12, 0],
          boxSizing: "border-box",
        }}
      >
        {children}
      </Container>
      <Footer />
      <SenifitNavBar />
    </>
  );
}
