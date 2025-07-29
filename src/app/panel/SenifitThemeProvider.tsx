"use client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

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

declare module "@mui/material/styles" {
  interface TypographyVariants {
    Display1: React.CSSProperties;
    Display2: React.CSSProperties;
    Title1: React.CSSProperties;
    Title2: React.CSSProperties;
    Title3: React.CSSProperties;
    Heading1: React.CSSProperties;
    Heading2: React.CSSProperties;
    Headline1: React.CSSProperties;
    Headline2: React.CSSProperties;
    Body1: React.CSSProperties;
    Body2: React.CSSProperties;
    Label1: React.CSSProperties;
    Label2: React.CSSProperties;
    Caption1: React.CSSProperties;
    Caption2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    Display1?: React.CSSProperties;
    Display2?: React.CSSProperties;
    Title1?: React.CSSProperties;
    Title2?: React.CSSProperties;
    Title3?: React.CSSProperties;
    Heading1?: React.CSSProperties;
    Heading2?: React.CSSProperties;
    Headline1?: React.CSSProperties;
    Headline2?: React.CSSProperties;
    Body1?: React.CSSProperties;
    Body2?: React.CSSProperties;
    Label1?: React.CSSProperties;
    Label2?: React.CSSProperties;
    Caption1?: React.CSSProperties;
    Caption2?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    Display1: true;
    Display2: true;
    Title1: true;
    Title2: true;
    Title3: true;
    Heading1: true;
    Heading2: true;
    Headline1: true;
    Headline2: true;
    Body1: true;
    Body2: true;
    Label1: true;
    Label2: true;
    Caption1: true;
    Caption2: true;
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

theme.components = {
  ...theme.components,
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        Display1: "h1",
        Display2: "h1",
        Title1: "h1",
        Title2: "h2",
        Title3: "h2",
        Heading1: "h3",
        Heading2: "h3",
        Headline1: "h4",
        Headline2: "h4",
        Body1: "p",
        Body2: "p",
        Label1: "span",
        Label2: "span",
        Caption1: "span",
        Caption2: "span",
      },
    },
  },
};

const fontColor = theme.palette.text.primary;

theme.typography = {
  ...theme.typography,
  Display1: {
    fontWeight: 700,
    fontSize: "3.5rem",
    lineHeight: "4.5rem",
    letterSpacing: "-0.01em",
    color: fontColor,
  },
  Display2: {
    fontWeight: 700,
    fontSize: "2.5rem",
    lineHeight: "3rem",
    letterSpacing: "-0.001em",
    color: fontColor,
  },
  Title1: {
    fontWeight: 700,
    fontSize: "2.25rem",
    lineHeight: "2.75rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
  Title2: {
    fontWeight: 700,
    fontSize: "1.75rem",
    lineHeight: "2.125rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
  Title3: {
    fontWeight: 700,
    fontSize: "1.5rem",
    lineHeight: "2rem",
    letterSpacing: "0em",
    color: fontColor,
  },
  Heading1: {
    fontWeight: 600,
    fontSize: "1.375rem",
    lineHeight: "1.75rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
  Heading2: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    letterSpacing: "-0.0008em",
    color: fontColor,
  },
  Headline1: {
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: "1.5rem",
    letterSpacing: "-0.01em",
    color: fontColor,
  },
  Headline2: {
    fontWeight: 600,
    fontSize: "1.0625rem",
    lineHeight: "1.5rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
  Body1: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.5rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
  Body2: {
    fontWeight: 400,
    fontSize: "0.9375rem",
    lineHeight: "1.25rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
  Label1: {
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    letterSpacing: "-0.0003em",
    color: fontColor,
  },
  Label2: {
    fontWeight: 400,
    fontSize: "0.8125rem",
    lineHeight: "1.125rem",
    letterSpacing: "-0.0003em",
    color: fontColor,
  },
  Caption1: {
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    letterSpacing: "-0.0003em",
    color: fontColor,
  },
  Caption2: {
    fontWeight: 400,
    fontSize: "0.6875rem",
    lineHeight: "0.875rem",
    letterSpacing: "-0.0005em",
    color: fontColor,
  },
};

const SenifitThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default SenifitThemeProvider;
