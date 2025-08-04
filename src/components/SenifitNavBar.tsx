"use client";

import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Box,
  Typography,
} from "@mui/material";
import { ClipboardIcon, HouseIcon, HumanIcon } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMedia from "@/hooks/useMedia";

interface NavActionProps extends BottomNavigationActionProps {
  href: string;
}

const NavAction = ({ ...props }: NavActionProps) => {
  return (
    <BottomNavigationAction
      sx={{
        ...props.sx,
        width: "100%",
        maxWidth: "100%",
      }}
      component={Link}
      slots={{
        label: (labelProps) => (
          <Typography variant={["Label1", "Headline1"]} {...labelProps} />
        ),
      }}
      {...props}
    />
  );
};

const SenifitNavBar = () => {
  const { isDesktop } = useMedia();
  const pathname = usePathname();

  const getCurrentPathValue = () => {
    if (pathname.startsWith("/my-center")) {
      return 2;
    } else if (pathname.startsWith("/record")) {
      return 1;
    }
    return 0;
  };

  const navActionStyle = {
    width: ["1.5rem", "2rem"],
    height: ["1.5rem", "2rem"],
    pb: "3px",
  };

  if (isDesktop) {
    return null; // Do not render on desktop
  }

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        height: ["5.5rem", "6rem"],
        p: 3,
        pt: 2,
        ".MuiBottomNavigationAction-root": {
          color: "interaction.inactive",
        },
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation showLabels value={getCurrentPathValue()}>
        <NavAction
          label="운동"
          icon={<HumanIcon sx={navActionStyle} />}
          href="/"
        />
        <NavAction
          label="기록"
          icon={<ClipboardIcon sx={navActionStyle} />}
          href="/record"
        />
        <NavAction
          label="나의 센터"
          icon={<HouseIcon sx={navActionStyle} />}
          href="/my-center"
        />
      </BottomNavigation>
    </Box>
  );
};

export default SenifitNavBar;
