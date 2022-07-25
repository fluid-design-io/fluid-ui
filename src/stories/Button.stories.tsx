import type { Meta, Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../lib/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    color: "gray",
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return (
    <Button color={args.color} {...args}>
      Default
    </Button>
  );
};

export const Default = Template.bind({});

export const IsOpen = Template.bind({});
IsOpen.storyName = "Default";
IsOpen.args = {};
