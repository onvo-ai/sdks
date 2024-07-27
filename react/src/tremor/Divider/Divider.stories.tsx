import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";

const meta: Meta = {
  component: Divider,
  title: "Primitives/Divider",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <Divider />

    <Divider>Separator</Divider>
  </div>
);
Variants.args = {};
