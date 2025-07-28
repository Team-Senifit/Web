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
