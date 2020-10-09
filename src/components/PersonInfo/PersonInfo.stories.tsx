import React from "react";
import { Meta, Story } from "@storybook/react";

import { personBuilder } from "mocks/Person";

import { PersonInfo, PersonInfoProps } from "./PersonInfo";

export default {
  title: "PersonInfo",
  component: PersonInfo,
} as Meta;

const Template: Story<PersonInfoProps> = (args) => <PersonInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: personBuilder(),
  isSelected: false,
};
