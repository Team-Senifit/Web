import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitNavBar from "../../components/SenifitNavBar";

const meta: Meta = {
  title: "components/SenifitNavBar",
  component: SenifitNavBar,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
