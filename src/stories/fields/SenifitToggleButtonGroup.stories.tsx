import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import SenifitToggleButtonGroup from "@/components/SenifitToggleButtonGroup";
import { IMultiProps, ISenifitToggleOption } from "@/types/IToggleButton";

/** ───────── Exclusive Wrapper (T = "year" | "month" | "day") ───────── */

type Depth = "year" | "month" | "day";

const meta = {
  title: "Components/SenifitToggleButtonGroup",
  component: SenifitToggleButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    sizeVariant: { control: { type: "radio" }, options: ["sm", "md", "lg"] },
    buttonProps: { control: "object" },
    maxItemsPerRow: {
      control: "number",
      description: "한 행에 표시할 최대 버튼 수",
    },
  },
} satisfies Meta<typeof SenifitToggleButtonGroup>;

export default meta;
type Story = StoryObj<typeof SenifitToggleButtonGroup>;

export const Exclusive: Story = {
  args: {
    sizeVariant: "md",
    groupProps: { gap: 1.25 },
    options: [
      { value: "year", label: "연도" },
      { value: "month", label: "월" },
      { value: "day", label: "일" },
    ] as ISenifitToggleOption<Depth>[],
  },
};

/** ───────── Multi Wrapper (T = "A" | "B" | "C") ───────── */

type ABC = "A" | "B" | "C";

interface IMultiWrapperProps
  extends Omit<
    IMultiProps<ABC>,
    "value" | "onChange" | "options" | "exclusive"
  > {}

const MultiWrapper = ({
  sizeVariant = "sm",
  fullWidth = true,
  groupProps,
  buttonProps,
}: IMultiWrapperProps) => {
  const [value, setValue] = React.useState<ABC[]>(["A"]);

  const options: ISenifitToggleOption<ABC>[] = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ] as const;

  return (
    <div style={{ width: "100%" }}>
      <SenifitToggleButtonGroup<ABC>
        exclusive={false}
        value={value}
        onChange={setValue}
        options={options}
        sizeVariant={sizeVariant}
        fullWidth={fullWidth}
        groupProps={{ gap: 1, ...groupProps }}
        buttonProps={buttonProps}
      />
    </div>
  );
};

export const Multi: StoryObj<typeof MultiWrapper> = {
  render: (args) => <MultiWrapper {...args} />,
  args: {
    sizeVariant: "sm",
    fullWidth: true,
  },
};
