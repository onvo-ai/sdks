import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ChartLoader } from "./ChartLoader";

const meta: Meta = {
  component: ChartLoader,
  title: "Elements/ChartLoader",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ChartLoader>;

export const Variants: Story = (args) => (
  <div className="onvo-h-24 onvo-w-[720px] onvo-flex onvo-flex-col onvo-gap-8">
    <ChartLoader logo="" />
    <ChartLoader logo="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png" />
  </div>
);
Variants.args = {};