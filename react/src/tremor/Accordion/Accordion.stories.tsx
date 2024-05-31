import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";

const meta: Meta = {
  component: Accordion,
  title: "Tremor/Accordion",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2 w-96">
    <Accordion type="single" className="w-full" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>In the app</AccordionTrigger>
        <AccordionContent>
          <ol className="flex flex-col gap-2">
            <li>
              <span className="font-semibold text-gray-900 dark:text-gray-50">
                Step 1:
              </span>{" "}
              Tap the Inbox icon and then tap Add receipts.
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-gray-50">
                Step 2:
              </span>{" "}
              Tap the + symbol to attach a photo or PDF of the receipt for our
              system to match.
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
Variants.args = {};
