import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { DateRangePicker } from "./DatePicker";

const meta: Meta = {
  component: DateRangePicker,
  title: "Primitives/Date Picker",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-p-2 dark:onvo-bg-slate-800 onvo-items-start onvo-justify-start onvo-h-screen onvo-w-screen">
    <div className="onvo-w-96">
      <DateRangePicker
        enableYearNavigation
        onChange={(e) => {
          console.log("OUTPUT: ", e);
        }}
      />
    </div>
  </div>
);
Variants.args = {};
