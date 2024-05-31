import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta = {
  component: Input,
  title: "Tremor/Input",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2 max-w-72">
    <Input placeholder="Default" />
    <Input hasError placeholder="Has an error" />
    <Input placeholder="disabled" disabled />
    <Input placeholder="Search" type="search" />
    <Input placeholder="Password" type="password" />
  </div>
);
Variants.args = {};
