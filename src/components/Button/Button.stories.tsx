import React from "react";
import { Meta, Story } from "@storybook/react";

import { Button, ButtonProps } from "./Button";

export default {
  title: "Button",
  component: Button,
  argTypes: { onClick: { action: "onClick" } },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};
