import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitSelect from "@/components/SenifitSelect";

const meta: Meta = {
  title: "Fields/SenifitSelect",
  component: SenifitSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
