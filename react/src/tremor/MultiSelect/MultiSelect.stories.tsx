import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "./MultiSelect";

const meta: Meta = {
  component: MultiSelect,
  title: "Tremor/MultiSelect",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof MultiSelect>;

const data = [
  {
    value: "dress-shirt-striped",
    label: "Striped Dress Shirt",
  },
  {
    value: "relaxed-button-down",
    label: "Relaxed Fit Button Down",
  },
  {
    value: "slim-button-down",
    label: "Slim Fit Button Down",
  },
  {
    value: "dress-shirt-solid",
    label: "Solid Dress Shirt",
  },
  {
    value: "dress-shirt-check",
    label: "Check Dress Shirt",
  },
];

export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2 max-w-72">
    <MultiSelect items={data} />

    <MultiSelect items={data} placeholder="Search for item" />
    <MultiSelect items={data} value={["relaxed-button-down"]} />
  </div>
);
Variants.args = {};