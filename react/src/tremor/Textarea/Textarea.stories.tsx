import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta: Meta = {
  component: Textarea,
  title: "Tremor/Textarea",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2 max-w-72">
    <Textarea placeholder="Default" />
    <Textarea hasError placeholder="Has an error" />
    <Textarea placeholder="disabled" disabled />
  </div>
);
Variants.args = {};
