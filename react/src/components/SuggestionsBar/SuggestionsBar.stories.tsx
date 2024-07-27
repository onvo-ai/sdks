import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { SuggestionsBar } from "./SuggestionsBar";

const meta: Meta = {
  component: SuggestionsBar,
  title: "Elements/SuggestionsBar",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SuggestionsBar>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <SuggestionsBar onSelect={() => {}} />
  </div>
);
Variants.args = {};
