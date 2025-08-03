"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Box,
  Typography,
} from "@mui/material";
import { ClipBoardIcon, HouseIcon, HumanIcon } from "./icons";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavActionProps extends BottomNavigationActionProps {
  href: string;
}

const NavAction = ({ ...props }: NavActionProps) => {
  return (
    <BottomNavigationAction
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

const SenifitNavBar = ({ isStorybook = false }: { isStorybook?: boolean }) => {
  const params = useParams();

  const getCurrentPathValue = () => {
    if (params?.toString().startsWith("my-center")) {
      return 2;
    } else if (params?.toString().startsWith("record")) {
      return 1;
    }
    return 0;
  };

  const navActionStyle = {
    width: ["1.5rem", "2rem"],
    height: ["1.5rem", "2rem"],
    pb: "3px",
  };

  let positionNav: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        width: "100%",
        height: ["5.5rem", "6rem"],
        p: 3,
        pt: 2,
        ".MuiBottomNavigationAction-root": {
          color: "interaction.inactive",
        },
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
        ...(!isStorybook && positionNav),
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
          icon={<ClipBoardIcon sx={navActionStyle} />}
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
