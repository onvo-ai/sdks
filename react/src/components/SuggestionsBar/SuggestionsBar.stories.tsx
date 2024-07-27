import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { SuggestionsBar } from "./SuggestionsBar";

const meta: Meta = {
  component: SuggestionsBar,
  title: "Components/Suggestions Bar",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SuggestionsBar>;

export const Primary: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <SuggestionsBar onSelect={() => {}} />
  </div>
);
Primary.args = {};
