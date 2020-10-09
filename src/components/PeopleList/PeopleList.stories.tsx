import React from "react";
import { Meta, Story } from "@storybook/react";

import { personBuilder } from "mocks/Person";

import { PeopleList, PeopleListProps } from "./PeopleList";

export default {
  title: "PeopleList",
  component: PeopleList,
  argTypes: { selectCard: { action: "selectCard" }, deselectCard: { action: "deselectCard" } },
} as Meta;

const Template: Story<PeopleListProps> = (args) => <PeopleList {...args} />;

export const Default = Template.bind({});
Default.args = {
  people: [...Array(100)].map((_, i) => ({ ...personBuilder(), isSelected: i < 10 })),
};
