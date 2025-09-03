import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitAccordion from "@/components/SenifitAccordion";
import { Box, Typography } from "@mui/material";

const meta: Meta<typeof SenifitAccordion> = {
  title: "components/SenifitAccordion",
  component: SenifitAccordion,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    titleVariant: { control: "text" },
    minHeight: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof SenifitAccordion>;

export const Primary: Story = {
  args: {
    title: "Accordion Title",
    titleVariant: "Headline2",
    minHeight: "3.5rem",
    expandIconColor: "#1976d2",
    titleColor: "#1976d2",
  },
  render: (args) => (
    <SenifitAccordion {...args}>
      <Box sx={{ p: 2 }}>
        <Typography>
          This is the accordion content. Use this area to place any children you
          like — text, lists, or other components.
        </Typography>
      </Box>
    </SenifitAccordion>
  ),
};
