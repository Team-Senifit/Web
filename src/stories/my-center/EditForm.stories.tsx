import type { Meta, StoryObj } from "@storybook/nextjs";
import EditForm from "@/app/my-center/members/panel/EditForm";

const meta: Meta = {
  title: "my-center/EditForm",
  component: EditForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Add: Story = {
  args: {
    // Add your default args here
  },
};

export const Edit: Story = {
  args: {
    defaultValues: {
      name: "홍길동",
      year: 1936,
      month: 5,
      day: 15,
      gender: 1,
      memberRank: 1,
    },
  },
};
