import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitRadioButtonGroup from "@/components/SenifitRadioButtonGroup";
import WithRHF from "../utils/WithRHF"; // 필요에 따라 경로 조정

const meta: Meta<typeof SenifitRadioButtonGroup> = {
  title: "Components/SenifitRadioButtonGroup",
  component: SenifitRadioButtonGroup,
  decorators: [WithRHF(false)], // submit 버튼 숨김
  tags: ["autodocs"],
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
