import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitTextField from "@/components/SenifitTextField";
import WithRHF from "../utils/WithRHF"; // 경로는 상황에 따라 조정

const meta: Meta<typeof SenifitTextField> = {
  title: "Fields/SenifitTextField",
  component: SenifitTextField,
  decorators: [WithRHF(false)], // submit 버튼 숨김 여부 설정
  tags: ["autodocs"],
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "폼 필드의 이름",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "name" },
      },
    },
    placeholder: {
      control: "text",
      description: "입력 필드의 플레이스홀더 텍스트",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Placeholder" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "입력 필드가 전체 너비를 차지할지 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    rules: {
      control: "object",
      description:
        "React Hook Form 유효성 검사 규칙. 예: { required: '필수 입력' }",
      table: {
        type: { summary: "object" },
        defaultValue: { summary: "{}" },
      },
    },
    control: {
      control: "object",
      description:
        "React Hook Form의 control 객체. 스토리북에서는 사용하지 않음",
      table: {
        type: { summary: "object" },
        defaultValue: { summary: "{}" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SenifitTextField>;

export const Default: Story = {
  args: {
    name: "email",
    placeholder: "이메일을 입력하세요",
    fullWidth: true,
    rules: { required: "이메일은 필수입니다" },
  },
};
