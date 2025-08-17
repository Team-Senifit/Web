import { ThemeProvider } from "@mui/material";
import type { Preview } from "@storybook/react";
import SenifitThemeProvider from "../src/app/panel/SenifitThemeProvider.tsx";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        default: { name: "default", value: "#F5F7FA" },
        paper: { name: "paper", value: "#FFFFFF" },
      },
    },
    initialGlobals: {
      backgrounds: { value: "default" },
    },
  },
  decorators: [
    (Story) => (
      <SenifitThemeProvider>
        <Story />
      </SenifitThemeProvider>
    ),
  ],
};

export default preview;
