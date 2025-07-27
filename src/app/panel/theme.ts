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

if (theme.components) {
  theme.components.MuiTypography = {
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
  };
}

if (theme.typography) {
  theme.typography.fontFamily = "Pretendard Variable, sans-serif";
  theme.typography.Display1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    fontSize: "3.5rem", // 56px
    lineHeight: "4.5rem", // 72px
    letterSpacing: "-1%",
    color: theme.palette.text.primary,
  };

  theme.typography.Display2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    fontSize: "2.5rem", // 40px
    lineHeight: "3rem", // 48px
    letterSpacing: "-0.1%",
    color: theme.palette.text.primary,
  };

  theme.typography.Title1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    fontSize: "2.25rem", // 36px
    lineHeight: "2.75rem", // 44px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };

  theme.typography.Title2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    fontSize: "1.75rem", // 28px
    lineHeight: "2.125rem", // 34px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };

  theme.typography.Title3 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 700,
    fontSize: "1.5rem", // 24px
    lineHeight: "2rem", // 32px
    letterSpacing: "0%",
    color: theme.palette.text.primary,
  };

  theme.typography.Heading1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.375rem", // 22px
    lineHeight: "1.75rem", // 28px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };

  theme.typography.Heading2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.25rem", // 20px
    lineHeight: "1.75rem", // 28px
    letterSpacing: "-0.08%",
    color: theme.palette.text.primary,
  };

  theme.typography.Headline1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.125rem", // 18px
    lineHeight: "1.5rem", // 24px
    letterSpacing: "-1%",
    color: theme.palette.text.primary,
  };

  theme.typography.Headline2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "1.0625rem", // 17px
    lineHeight: "1.5rem", // 24px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };

  theme.typography.Body1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontSize: "1rem", // 16px
    lineHeight: "1.5rem", // 24px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };

  theme.typography.Body2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontSize: "0.9375rem", // 15px
    lineHeight: "1.25rem", // 20px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };

  theme.typography.Label1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
    fontSize: "0.875rem", // 14px
    lineHeight: "1.25rem", // 20px
    letterSpacing: "-0.03%",
    color: theme.palette.text.primary,
  };

  theme.typography.Label2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontSize: "0.8125rem", // 13px
    lineHeight: "1.125rem", // 18px
    letterSpacing: "-0.03%",
    color: theme.palette.text.primary,
  };

  theme.typography.Caption1 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontSize: "0.75rem", // 12px
    lineHeight: "1rem", // 16px
    letterSpacing: "-0.03%",
    color: theme.palette.text.primary,
  };

  theme.typography.Caption2 = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    fontSize: "0.6875rem", // 11px
    lineHeight: "0.875rem", // 14px
    letterSpacing: "-0.05%",
    color: theme.palette.text.primary,
  };
}

export { theme };
