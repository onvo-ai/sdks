import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta: Meta = {
  component: Textarea,
  title: "Primitives/Textarea",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2 onvo-max-w-72">
    <Textarea placeholder="Default" />
    <Textarea hasError placeholder="Has an error" />
    <Textarea placeholder="disabled" disabled />
  </div>
);
Variants.args = {};
