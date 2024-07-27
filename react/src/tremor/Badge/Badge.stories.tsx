import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta: Meta = {
  component: Badge,
  title: "Primitives/Badge",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-row onvo-gap-2">
    <Badge>Default</Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
  </div>
);
Variants.args = {};
