import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "@/components/icons";
import { color } from "storybook/internal/theming";

const meta: Meta = {
  title: "components/Icons",
  tags: ["autodocs"],
  argTypes: {
    component: {
      description: "스토리북에서만 사용",
      control: false,
    },
    sx: {
      control: "object",
      description: "스타일링을 위한 MUI sx prop",
    },
    color: {
      type: "string",
      description: "아이콘 색상. MUI의 키워드를 사용할 수 있습니다.",
      control: { type: "select" },
      options: [
        "inherit",
        "action",
        "disabled",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
    },
    fontSize: {
      type: "string",
      description: "아이콘 크기. MUI의 키워드를 사용할 수 있습니다.",
      control: { type: "select" },
      options: ["inherit", "large", "medium", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<any>;

// 공통 템플릿 - JavaScript 스타일 유지
const Template = (args: any) => <args.component {...args} />;

export const HumanIcon: Story = {
  render: Template as any,
  args: {
    component: Icons.HumanIcon,
    color: "primary",
  },
};

export const HumanIconWithSize: Story = {
  render: Template as any,
  args: {
    component: Icons.HumanIcon,
    color: "primary",
    fontSize: "large",
  },
};

export const ClipBoardIcon: Story = {
  render: Template as any,
  args: {
    component: Icons.ClipBoardIcon,
    color: "secondary",
  },
};

export const HouseIcon: Story = {
  render: Template as any,
  args: {
    component: Icons.HouseIcon,
    color: "error",
  },
};
