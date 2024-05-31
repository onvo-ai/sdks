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
  <div className="flex justify-center">
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Open</Button>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Billed to:
            </p>
            <p className="text-gray-800 dark:text-gray-200">
              ForDailyUseCo Ltd.
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Spent by:
              </p>
            </div>
            <p className="text-gray-800 dark:text-gray-200">
              ForDailyUseCo Ltd.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);
Variants.args = {};
