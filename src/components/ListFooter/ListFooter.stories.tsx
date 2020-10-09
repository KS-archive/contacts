import React from "react";
import { Meta, Story } from "@storybook/react";

import { ListFooter, ListFooterProps } from "./ListFooter";

export default {
  title: "ListFooter",
  component: ListFooter,
  argTypes: { fetchMore: { action: "fetchMore" } },
} as Meta;

const Template: Story<ListFooterProps> = (args) => <ListFooter {...args} />;

export const PendingState = Template.bind({});
PendingState.args = {
  status: "pending",
};

export const SuccessState = Template.bind({});
SuccessState.args = {
  status: "resolved",
};

export const FailureState = Template.bind({});
FailureState.args = {
  status: "rejected",
};
