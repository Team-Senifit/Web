import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  BottomNavigation,
  BottomNavigationAction,
  BottomNavigationActionProps,
  Typography,
} from "@mui/material";
import { HumanIcon } from "./icons";
import Link from "next/link";

interface NavActionProps extends BottomNavigationActionProps {
  href: string;
}

const NavAction = ({ ...props }: NavActionProps) => {
  return (
    <BottomNavigationAction
      component={Link}
      sx={{
        height: "100%",
      }}
      slots={{
        label: (labelProps) => <Typography variant="Label1" {...labelProps} />,
      }}
      {...props}
    />
  );
};

const SenifitNavBar = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      sx={{
        width: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: ["5.5rem"],
        p: 3,
        pt: 2,
        ".MuiBottomNavigationAction-root": {
          color: "interaction.inactive",
        },
        boxShadow: "0 0 8px 0 rgba(12, 13, 13, 0.05)",
      }}
      showLabels
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
    >
      <NavAction
        label="운동"
        icon={<HumanIcon sx={{ width: 24, pb: "3px" }} />}
        href="/"
      />
      <NavAction label="기록" icon={<FavoriteIcon />} href="/record" />
      <NavAction
        label="나의 센터"
        icon={<LocationOnIcon />}
        href="/my-center"
      />
    </BottomNavigation>
  );
};

export default SenifitNavBar;
