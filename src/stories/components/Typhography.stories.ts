import type { Meta, StoryObj } from "@storybook/react";
import Typography from "@mui/material/Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "Display1",
          "Display2",
          "Title1",
          "Title2",
          "Title3",
          "Heading1",
          "Heading2",
          "Headline1",
          "Headline2",
          "Body1",
          "Body2",
          "Label1",
          "Label2",
          "Caption1",
          "Caption2",
        ],
      },
      description: "Typography variant",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "Body1",
        },
      },
    },
    children: {
      control: "text",
      description: "Text content of the Typography component",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "Sample text",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Display1: Story = {
  args: {
    variant: "Display1",
    children: "Display 1",
  },
};

export const Display2: Story = {
  args: {
    variant: "Display2",
    children: "Display 2",
  },
};

export const Title1: Story = {
  args: {
    variant: "Title1",
    children: "Title 1",
  },
};

export const Title2: Story = {
  args: {
    variant: "Title2",
    children: "Title 2",
  },
};

export const Title3: Story = {
  args: {
    variant: "Title3",
    children: "Title 3",
  },
};

export const Heading1: Story = {
  args: {
    variant: "Heading1",
    children: "Heading 1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "Heading2",
    children: "Heading 2",
  },
};

export const Headline1: Story = {
  args: {
    variant: "Headline1",
    children: "Headline 1",
  },
};

export const Headline2: Story = {
  args: {
    variant: "Headline2",
    children: "Headline 2",
  },
};

export const Body1: Story = {
  args: {
    variant: "Body1",
    children: "Body 1",
  },
};

export const Body2: Story = {
  args: {
    variant: "Body2",
    children: "Body 2",
  },
};

export const Label1: Story = {
  args: {
    variant: "Label1",
    children: "Label 1",
  },
};

export const Label2: Story = {
  args: {
    variant: "Label2",
    children: "Label 2",
  },
};

export const Caption1: Story = {
  args: {
    variant: "Caption1",
    children: "Caption 1",
  },
};

export const Caption2: Story = {
  args: {
    variant: "Caption2",
    children: "Caption 2",
  },
};
