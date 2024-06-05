import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta: Meta = {
  component: Checkbox,
  title: "Tremor/Checkbox",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <Checkbox />

    <Checkbox disabled />
  </div>
);
Variants.args = {};
