import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    phone: true;
    tablet: true;
    desktop: true;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: '"Pretendard Variable", sans-serif',
  },
  breakpoints: {
    values: {
      phone: 0,
      tablet: 600,
      desktop: 1200,
    },
  },
});

export { theme };
