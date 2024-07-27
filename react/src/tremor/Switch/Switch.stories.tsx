import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";

const meta: Meta = {
  component: Switch,
  title: "Primitives/Switch",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <Switch />
  </div>
);
Variants.args = {};
