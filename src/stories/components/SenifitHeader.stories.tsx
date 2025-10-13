import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitHeader from "@/components/SenifitHeader";

const meta: Meta = {
  title: "components/SenifitHeader",
  component: SenifitHeader,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Add your default args here
  },
};
