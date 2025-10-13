"use client";

import React from "react";
import useMedia from "@/hooks/useMedia";
import {
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Tab,
  TabProps,
  Tabs,
  Typography,
} from "@mui/material";
import Logo from "@/assets/logo/senifit-logo.svg";
import Image from "next/image";
import { ClipboardIcon, HouseIcon, HumanIcon } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IPCNavTabProps extends TabProps {
  href: string;
}

const PCNavTab = (props: IPCNavTabProps) => {
  const { href, label, ...rest } = props;
  return (
    <Tab
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
      href={href}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component={Link as any}
      label={<Typography variant={"Heading1"}>{label}</Typography>}
      sx={{
        height: "100%",
        minWidth: "15rem",
      }}
    />
  );
};

const PCNav = () => {
  const { isDesktop } = useMedia();
  const pathname = usePathname();

  const getCurrentPathValue = () => {
    if (pathname?.startsWith("/my-center")) {
      return 2;
    } else if (pathname?.startsWith("/record")) {
      return 1;
    }
    return 0;
  };

  const tabIconStyle: SxProps = {
    width: "2rem",
    height: "2rem",
    pr: 1,
  };

  if (!isDesktop) {
    return null;
  }

  return (
    <Tabs
      value={getCurrentPathValue()}
      sx={{
        height: "100%",
        "& .MuiTabs-flexContainer": {
          height: "100%",
          alignItems: "center",
          gap: "0.625rem",
        },
        // 탭 비선택 시 텍스트 색상
        "& .MuiTab-root": { color: "interaction.inactive" },
        // 탭 선택 시 텍스트 색상
        "& .Mui-selected": { color: "primary.main" },
      }}
    >
      <PCNavTab
        label={"운동"}
        iconPosition={"start"}
        icon={<HumanIcon sx={tabIconStyle} strokeWidth={2} />}
        href={"/"}
      />
      <PCNavTab
        label={"기록"}
        iconPosition={"start"}
        icon={<ClipboardIcon sx={tabIconStyle} strokeWidth={2} />}
        href={"/record"}
      />
      <PCNavTab
        label={"우리 센터"}
        iconPosition={"start"}
        icon={<HouseIcon sx={tabIconStyle} strokeWidth={2} />}
        href={"/my-center"}
      />
    </Tabs>
  );
};

const SenifitHeader = () => {
  // 헤더 없는 페이지들
  const noHeaderPages = ["/login"];

  const pathname = usePathname();

  // 헤더가 필요 없는 페이지인지 확인
  if (noHeaderPages.includes(pathname)) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
        bgcolor: "background.paper",
      }}
    >
      <Container
        maxWidth={"desktop"}
        component={Stack}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          bgcolor: "background.paper",
          px: 3,
          py: [2, 2, 0],
          height: ["4.5rem", "4.5rem", "7rem"],
          boxSizing: "border-box",
        }}
      >
        <Button component={Link} href={"/"} sx={{ p: 0, minWidth: "auto" }}>
          <Image src={Logo} alt={"시니핏 로고"} />
        </Button>
        <PCNav />
      </Container>
    </Box>
  );
};

export default SenifitHeader;
