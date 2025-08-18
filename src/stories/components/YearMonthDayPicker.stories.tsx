import type { Meta, StoryObj } from "@storybook/nextjs";
import YearMonthDayPicker from "../../components/YearMonthDayPicker";
import WithRHF from "../utils/WithRHF";

const meta: Meta = {
  title: "components/YearMonthDayPicker",
  component: YearMonthDayPicker,
  tags: ["autodocs"],
  decorators: [WithRHF(false)],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Add your default args here
  },
};
