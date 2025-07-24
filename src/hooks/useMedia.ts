"use client";

import { useMediaQuery } from "@mui/material";

const useMedia = () => {
  const isPhone = useMediaQuery("(max-width: 599px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  return {
    isPhone,
    isTablet,
    isDesktop,
  };
};

export default useMedia;
