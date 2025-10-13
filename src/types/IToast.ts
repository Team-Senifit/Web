export type AutoHide = "short" | "normal" | "long";

export const autoHideDurationMap: Record<AutoHide, number> = {
  short: 1000,
  normal: 3000,
  long: 5000,
};

export interface IToast {
  message: string;
  open: boolean;
  autoHide: AutoHide;
  setToastOpen: ({
    message,
    autoHide,
  }: {
    message: string;
    autoHide?: AutoHide;
  }) => void;
  setToastClose: () => void;
}
