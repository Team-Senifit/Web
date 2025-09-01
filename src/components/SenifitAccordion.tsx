import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  SxProps,
} from "@mui/material";
import React, { ReactNode } from "react";

interface ISenifitAccordionProps {
  title: string;
  children: ReactNode;
  titleVariant?: string;
  minHeight?: string;
  expandIconColor?: string;
  titleColor?: string;
  accordionSx?: SxProps;
  summarySx?: SxProps;
  detailsSx?: SxProps;
}

const SenifitAccordion = ({
  title,
  children,
  titleVariant = "Headline1",
  minHeight = "3.5rem",
  expandIconColor = "primary.main",
  titleColor = "primary.main",
  accordionSx = {},
  summarySx = {},
  detailsSx = {},
}: ISenifitAccordionProps) => {
  return (
    <Accordion
      sx={{
        borderRadius: "0.75rem !important",
        backgroundColor: "background.default",
        boxShadow: "none",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: 0, borderRadius: "0.75rem" },
        "& .MuiButtonBase-root": {
          borderRadius: "0.75rem",
        },
        "&:first-of-type": {
          borderRadius: "0.75rem !important",
        },
        "&:last-of-type": {
          borderRadius: "0.75rem !important",
        },
        border: "2px solid",
        borderColor: "borderVariants.normal",
        ...accordionSx,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: expandIconColor }} />}
        sx={{
          backgroundColor: "background.default",
          height: minHeight,
          "& .MuiAccordionSummary-content": {
            width: "fit-content",
            flexGrow: 0,
            justifyContent: "center",
            "&.Mui-expanded": { margin: "12px 0" },
          },
          borderRadius: "0.75rem 0.75rem",
          "&.Mui-expanded": {
            borderRadius: "0.75rem 0.75rem",
            borderBottom: "2px solid",
            borderColor: "borderVariants.normal",
          },
          ...summarySx,
        }}
      >
        <Typography
          sx={{ color: titleColor }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          variant={titleVariant as any}
          component={"span"}
        >
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: "background.default",
          borderRadius: "0 0 0.75rem 0.75rem",
          p: 0,
          ...detailsSx,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default SenifitAccordion;
