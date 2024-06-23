import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Logo } from "./Logo";

const meta: Meta = {
  component: Logo,
  title: "Elements/Logo",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Variants: Story = (args) => (
  <div className="onvo-h-12 onvo-w-12">
    <Logo />
  </div>
);
Variants.args = {};
