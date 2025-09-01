import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitRadioButtonGroup from "@/components/SenifitRadioButtonGroup";
import WithRHF from "../utils/WithRHF"; // 필요에 따라 경로 조정

const meta: Meta<typeof SenifitRadioButtonGroup> = {
  title: "Components/SenifitRadioButtonGroup",
  component: SenifitRadioButtonGroup,
  decorators: [WithRHF(false)], // submit 버튼 숨김
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
    label: {
      control: "text",
      description: "라벨 텍스트",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Label" },
      },
    },
    options: {
      control: "object",
      description: "라디오 버튼 옵션 배열",
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
    row: {
      control: "boolean",
      description: "라디오 버튼을 가로로 배치할지 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    control: {
      control: "object",
      description:
        "React Hook Form의 control 객체. 스토리북에서는 사용하지 않음",
      table: {
        type: { summary: "Control" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof SenifitRadioButtonGroup>;

const OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

export const Default: Story = {
  args: {
    name: "gender",
    label: "Gender",
    options: OPTIONS,
    rules: { required: "성별을 선택해주세요" },
    row: false,
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    row: true,
  },
};
