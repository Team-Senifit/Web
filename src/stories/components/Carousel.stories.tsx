import type { Meta, StoryObj } from "@storybook/nextjs";
import Carousel from "@/components/Carousel";
import { Box } from "@mui/material";

const meta: Meta<typeof Carousel> = {
  title: "components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { type: "object" },
      description: "캐러셀에 표시할 아이템 배열",
    },
    renderItem: {
      description: "각 아이템을 렌더링하는 함수",
    },
    itemWidth: {
      control: { type: "number" },
      description: "각 아이템의 너비",
    },
    gap: {
      control: { type: "number" },
      description: "아이템 간의 간격, spacing 단위",
    },
    padding: {
      control: { type: "number" },
      description: "캐러셀의 패딩, spacing 단위",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const sampleItems = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  color: `hsl(${(i * 45) % 360} 70% 80%)`,
}));

export const Primary: Story = {
  args: {
    items: sampleItems,
    itemWidth: 216,
    gap: 2,
    padding: 1,
  },
  render: (args) => (
    <Carousel
      items={args.items}
      itemWidth={args.itemWidth}
      gap={args.gap}
      padding={args.padding}
      renderItem={(item: any, index: number) => (
        <Box
          key={item.id}
          sx={{
            width: args.itemWidth,
            height: 140,
            bgcolor: item.color,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 2,
            fontWeight: 600,
          }}
        >
          {item.title}
        </Box>
      )}
    />
  ),
};
