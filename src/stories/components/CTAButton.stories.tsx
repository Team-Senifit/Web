import type { Meta, StoryObj } from "@storybook/nextjs";
import CTAButton from "@/components/CTAButton";

const meta: Meta = {
  title: "components/CTAButton",
  component: CTAButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    text: {
      control: "text",
      description: "버튼에 표시될 텍스트",
    },
    href: {
      control: "text",
      description: "버튼 클릭 시 이동할 URL",
    },
    sx: {
      control: "object",
      description: "버튼의 스타일을 정의하는 MUI sx prop",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "관리하기",
    sx: {
      bgcolor: "fillVariants.colored",
    },
  },
};
