import { Chip } from "@mui/material";
import React from "react";

const Tag = ({ label }: { label: string }) => {
  return <Chip label={label} />;
};

export default Tag;
