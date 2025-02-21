import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { PromptInput } from "../PromptInput/PromptInput";

const meta: Meta = {
  component: PromptInput,
  title: "Components/Prompt Input",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PromptInput>;

export const Primary: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <PromptInput url={undefined} onSubmit={() => { }} />
  </div>
);
Primary.args = {};
