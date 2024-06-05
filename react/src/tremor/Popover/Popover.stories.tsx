import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { Button } from "../Button";

const meta: Meta = {
  component: Popover,
  title: "Tremor/Popover",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-justify-center">
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Open</Button>
      </PopoverTrigger>
      <PopoverContent className="onvo-p-4">
        <div className="onvo-flex onvo-flex-col onvo-gap-4">
          <div className="onvo-space-y-1">
            <p className="onvo-text-sm onvo-font-medium onvo-text-gray-700 dark:onvo-text-gray-300">
              Billed to:
            </p>
            <p className="onvo-text-gray-800 dark:onvo-text-gray-200">
              ForDailyUseCo Ltd.
            </p>
          </div>
          <div className="onvo-space-y-1">
            <div className="onvo-flex onvo-items-center">
              <p className="onvo-text-sm onvo-font-medium onvo-text-gray-700 dark:onvo-text-gray-300">
                Spent by:
              </p>
            </div>
            <p className="onvo-text-gray-800 dark:onvo-text-gray-200">
              ForDailyUseCo Ltd.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);
Variants.args = {};
