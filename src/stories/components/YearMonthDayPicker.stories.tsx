import type { Meta, StoryObj } from "@storybook/nextjs";
import YearMonthDayPicker from "../../components/YearMonthDayPicker";

const meta: Meta = {
  title: "components/YearMonthDayPicker",
  component: YearMonthDayPicker,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Add your default args here
  },
};
