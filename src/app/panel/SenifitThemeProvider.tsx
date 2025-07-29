"use client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { CSSProperties } from "react";
import type { PaletteOptions as MuiPaletteOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  // Breakpoints
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

  // Typography variants
  interface TypographyVariants {
    Display1: CSSProperties;
    Display2: CSSProperties;
    Title1: CSSProperties;
    Title2: CSSProperties;
    Title3: CSSProperties;
    Heading1: CSSProperties;
    Heading2: CSSProperties;
    Headline1: CSSProperties;
    Headline2: CSSProperties;
    Body1: CSSProperties;
    Body2: CSSProperties;
    Label1: CSSProperties;
    Label2: CSSProperties;
    Caption1: CSSProperties;
    Caption2: CSSProperties;
  }
  interface TypographyVariantsOptions {
    Display1?: CSSProperties;
    Display2?: CSSProperties;
    Title1?: CSSProperties;
    Title2?: CSSProperties;
    Title3?: CSSProperties;
    Heading1?: CSSProperties;
    Heading2?: CSSProperties;
    Headline1?: CSSProperties;
    Headline2?: CSSProperties;
    Body1?: CSSProperties;
    Body2?: CSSProperties;
    Label1?: CSSProperties;
    Label2?: CSSProperties;
    Caption1?: CSSProperties;
    Caption2?: CSSProperties;
  }

  // Palette 확장
  interface Palette {
    static: {
      white: string;
      black: string;
    };
    primaryVariants: {
      default: string;
      pressed: string;
      disabled: string;
    };
    label: {
      strong: string;
      normal: string;
      neutral: string;
      alternative: string;
      disabled: string;
    };
    bg: {
      normal: string;
      alternative: string;
      colored: string;
    };
    interaction: {
      inactive: string;
      disabled: string;
    };
    statusVariants: {
      positive: string;
      cautionary: string;
      negative: string;
    };
    fillVariants: {
      normal: string;
      strong: string;
      alternative: string;
      colored: string;
      negative: string;
      positive: string;
    };
    borderVariants: {
      normal: string;
      strong: string;
    };
    material: {
      dimmer: string;
    };
  }

  interface PaletteOptions
    extends Pick<
      MuiPaletteOptions,
      | "common"
      | "primary"
      | "secondary"
      | "error"
      | "warning"
      | "info"
      | "success"
      | "mode"
      | "contrastThreshold"
      | "tonalOffset"
      | "divider"
      | "background"
      | "text"
      | "action"
      | "grey"
    > {
    static?: {
      white?: string;
      black?: string;
    };
    primaryVariants?: {
      default?: string;
      pressed?: string;
      disabled?: string;
    };
    label?: {
      strong?: string;
      normal?: string;
      neutral?: string;
      alternative?: string;
      disabled?: string;
    };
    bg?: {
      normal?: string;
      alternative?: string;
      colored?: string;
    };
    interaction?: {
      inactive?: string;
      disabled?: string;
    };
    statusVariants?: {
      positive?: string;
      cautionary?: string;
      negative?: string;
    };
    fillVariants?: {
      normal?: string;
      strong?: string;
      alternative?: string;
      colored?: string;
      negative?: string;
      positive?: string;
    };
    borderVariants?: {
      normal?: string;
      strong?: string;
    };
    material?: {
      dimmer?: string;
    };
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
  palette: {
    /** ─── MUI 기본 키 매핑 ───────────────────────────────────────────────── */
    common: {
      white: "#FFFFFF",
      black: "#000000",
    },
    primary: {
      main: "#F15B04", // default
      dark: "#C94C03", // pressed
      light: "#FEDFCD", // disabled
    },
    text: {
      primary: "#0C0D0D", // label-strong
      secondary: "#19191A", // label-normal
      disabled: "#CBCBCD", // label-disabled
    },
    grey: {
      600: "#646568", // label-neutral
      500: "#97989B", // label-alternative & border-strong
    },
    background: {
      default: "#FFFFFF", // bg-normal
      paper: "#F5F5F5", // bg-alternative
    },
    action: {
      active: "#7D7E82", // interaction-inactive
      disabled: "#F5F5F5", // interaction-disabled
    },
    success: { main: "#0AC254" }, // status-positive
    warning: { main: "#FF8A00" }, // status-cautionary
    error: { main: "#E21304" }, // status-negative
    divider: "#CBCBCD", // border-normal

    /** ─── 이미지 토큰 이름 그대로 노출 ───────────────────────────────────────── */
    static: {
      white: "#FFFFFF",
      black: "#000000",
    },
    primaryVariants: {
      default: "#F15B04",
      pressed: "#C94C03",
      disabled: "#FEDFCD",
    },
    label: {
      strong: "#0C0D0D",
      normal: "#19191A",
      neutral: "#646568",
      alternative: "#97989B",
      disabled: "#CBCBCD",
    },
    bg: {
      normal: "#FFFFFF",
      alternative: "#F5F5F5",
      colored: "#FFF9F5",
    },
    interaction: {
      inactive: "#7D7E82",
      disabled: "#F5F5F5",
    },
    statusVariants: {
      positive: "#0AC254",
      cautionary: "#FF8A00",
      negative: "#E21304",
    },
    fillVariants: {
      normal: "#F5F5F5",
      strong: "#CBCBCD",
      alternative: "#FAFAFA",
      colored: "#FFF5F0",
      negative: "#FFF6F5",
      positive: "#F5FEF9",
    },
    borderVariants: {
      normal: "#CBCBCD",
      strong: "#97989B",
    },
    material: {
      // #0C0D0D 50% 투명도
      dimmer: "rgba(12,13,13,0.5)",
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

theme.typography.Display1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "3.5rem", // 56px
  lineHeight: "4.5rem", // 72px
  letterSpacing: "-0.01em", // -1%
  color: theme.palette.text.primary,
};

theme.typography.Display2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "2.5rem", // 40px
  lineHeight: "3rem", // 48px
  letterSpacing: "-0.001em", // -0.1%
  color: theme.palette.text.primary,
};

theme.typography.Title1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "2.25rem", // 36px
  lineHeight: "2.75rem", // 44px
  letterSpacing: "-0.0005em", // -0.05%
  color: theme.palette.text.primary,
};

theme.typography.Title2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "1.75rem", // 28px
  lineHeight: "2.125rem", // 34px
  letterSpacing: "-0.0005em", // -0.05%
  color: theme.palette.text.primary,
};

theme.typography.Title3 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  fontSize: "1.5rem", // 24px
  lineHeight: "2rem", // 32px
  letterSpacing: "0em", // 0%
  color: theme.palette.text.primary,
};

theme.typography.Heading1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "1.375rem", // 22px
  lineHeight: "1.75rem", // 28px
  letterSpacing: "-0.0005em",
  color: theme.palette.text.primary,
};

theme.typography.Heading2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "1.25rem", // 20px
  lineHeight: "1.75rem", // 28px
  letterSpacing: "-0.0008em",
  color: theme.palette.text.primary,
};

theme.typography.Headline1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "1.125rem", // 18px
  lineHeight: "1.5rem", // 24px
  letterSpacing: "-0.01em",
  color: theme.palette.text.primary,
};

theme.typography.Headline2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "1.0625rem", // 17px
  lineHeight: "1.5rem", // 24px
  letterSpacing: "-0.0005em",
  color: theme.palette.text.primary,
};

theme.typography.Body1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "1rem", // 16px
  lineHeight: "1.5rem", // 24px
  letterSpacing: "-0.0005em",
  color: theme.palette.text.primary,
};

theme.typography.Body2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "0.9375rem", // 15px
  lineHeight: "1.25rem", // 20px
  letterSpacing: "-0.0005em",
  color: theme.palette.text.primary,
};

theme.typography.Label1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 600,
  fontSize: "0.875rem", // 14px
  lineHeight: "1.25rem", // 20px
  letterSpacing: "-0.0003em",
  color: theme.palette.text.primary,
};

theme.typography.Label2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "0.8125rem", // 13px
  lineHeight: "1.125rem", // 18px
  letterSpacing: "-0.0003em",
  color: theme.palette.text.primary,
};

theme.typography.Caption1 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "0.75rem", // 12px
  lineHeight: "1rem", // 16px
  letterSpacing: "-0.0003em",
  color: theme.palette.text.primary,
};

theme.typography.Caption2 = {
  fontFamily: theme.typography.fontFamily,
  fontWeight: 400,
  fontSize: "0.6875rem", // 11px
  lineHeight: "0.875rem", // 14px
  letterSpacing: "-0.0005em",
  color: theme.palette.text.primary,
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
