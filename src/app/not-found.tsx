import { TriangleAlertIcon } from "@/components/icons";
import SenifitHeader from "@/components/SenifitHeader";
import SenifitNavBar from "@/components/SenifitNavBar";
import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <>
      <SenifitHeader />
      <Container
        maxWidth={"desktop"}
        sx={{
          pt: [9, 12, 20.75],
          px: [0, 3],
          pb: [14, 15, 6],
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        <Stack
          spacing={3}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            p: 3,
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            boxShadow: ["none", "0 0 8px 0 rgba(12, 13, 13, 0.05)"],
            borderRadius: [0, "0.75rem"],
          }}
        >
          <TriangleAlertIcon
            strokeWidth={3}
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              color: "statusVariants.cautionary",
            }}
          />
          <Stack
            spacing={1}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant={"Heading1"} sx={{ color: "label.neutral" }}>
              {"사이트 주소가 잘못 입력되었어요."}
            </Typography>
            <Typography variant={"Heading1"} sx={{ color: "label.normal" }}>
              {"시니핏을 사용하려면 아래 버튼을 눌러주세요."}
            </Typography>
          </Stack>

          <Button
            component={Link}
            href={"/"}
            variant={"contained"}
            sx={{
              py: 2,
              px: 8,
              borderRadius: "0.75rem",
            }}
          >
            <Typography variant={"Heading1"}>{"시니핏 바로가기"}</Typography>
          </Button>
        </Stack>
      </Container>
      <SenifitNavBar />
    </>
  );
};

export default NotFound;
