import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitToggleButtonGroupField from "@/components/SenifitToggleButtonGroupField";
import WithRHF from "../utils/WithRHF";
import { durationOptions } from "@/app/(with-container)/(exercise)/exercise/customized/panel/options";

const meta: Meta = {
  title: "Fields/SenifitToggleButtonGroupField",
  component: SenifitToggleButtonGroupField,
  tags: ["autodocs"],
  decorators: [WithRHF(false)],
  argTypes: {
    name: {
      control: "text",
      description: "폼 필드의 이름",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "name" },
      },
    },
    options: {
      control: "object",
      description: "토글 버튼 옵션 배열",
      table: {
        type: { summary: "Array<{ value: string; label: React.ReactNode }>" },
        defaultValue: { summary: "[]" },
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

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "운동 시간",
    options: durationOptions,
  },
};
