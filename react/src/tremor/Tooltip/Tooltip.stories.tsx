import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta: Meta = {
  component: Tooltip,
  title: "Primitives/Tooltip",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <Tooltip content="Which KPIs are the most visited in your project">
      <span className="rounded-md bg-gray-100 p-2 text-sm font-medium text-gray-700 dark:border dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
        Hover over me
      </span>
    </Tooltip>
  </div>
);
Variants.args = {};
