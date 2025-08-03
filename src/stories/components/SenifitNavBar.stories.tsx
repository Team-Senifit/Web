import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitNavBar from "../../components/SenifitNavBar";

const meta: Meta = {
  title: "components/SenifitNavBar",
  component: SenifitNavBar,
  argTypes: {
    isStorybook: {
      control: "boolean",
      description:
        "스토리북에서 사용 여부.<br />docs에서 잘 보려면 true로 설정",
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isStorybook: false,
  },
};
