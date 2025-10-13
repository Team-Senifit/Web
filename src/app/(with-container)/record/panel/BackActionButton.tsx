"use client";

import { Box } from "@mui/material";
import ReturnButton from "@/components/ReturnButton";
import useMedia from "@/hooks/useMedia";

export default function BackActionButton({ href }: { href: string }) {
  const { isPhone } = useMedia();

  return (
    <Box sx={{ px: isPhone ? 3 : 0 }}>
      <Box sx={{ width: isPhone ? "100%" : "auto" }}>
        <ReturnButton href={href} />
      </Box>
    </Box>
  );
}
