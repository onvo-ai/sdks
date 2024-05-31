import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";

const meta: Meta = {
  component: Divider,
  title: "Tremor/Divider",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Divider>;

export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2">
    <Divider />

    <Divider>Separator</Divider>
  </div>
);
Variants.args = {};
