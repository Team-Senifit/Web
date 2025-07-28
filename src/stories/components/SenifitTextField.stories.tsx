import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitTextField from "@/components/SenifitTextField";
import WithRHF from "../utils/WithRHF"; // 경로는 상황에 따라 조정

const meta: Meta<typeof SenifitTextField> = {
  title: "Forms/SenifitTextField",
  component: SenifitTextField,
  decorators: [WithRHF(false)], // submit 버튼 숨김 여부 설정
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SenifitTextField>;

export const Default: Story = {
  args: {
    name: "email",
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    fullWidth: true,
    rules: { required: "이메일은 필수입니다" },
  },
};
