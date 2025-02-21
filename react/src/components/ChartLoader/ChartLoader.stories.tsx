import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ChartLoader } from "./ChartLoader";

const meta: Meta = {
  component: ChartLoader,
  title: "Components/Chart Loader",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ChartLoader>;

export const Variants: Story = (args) => (
  <div className="onvo-h-24 onvo-w-[720px] onvo-flex onvo-flex-col onvo-gap-8">
    <ChartLoader variant="card" />
    <ChartLoader variant="message" />
    <ChartLoader
      variant="message"
    />
  </div>
);
Variants.args = {};
