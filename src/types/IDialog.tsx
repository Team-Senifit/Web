import { ButtonProps } from "@mui/material";

export type DialogType = "question" | "success" | "error";

export interface ISenifitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogType: DialogType;
  title: string;
  body?: string;
  primaryText?: string;
  secondaryText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryButtonProps?: ButtonProps;
  secondaryButtonProps?: ButtonProps;
}
