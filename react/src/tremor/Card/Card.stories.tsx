import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Text, Label, Title, Metric } from "../Text";
import { Card } from "./Card";

const meta: Meta = {
  component: Card,
  title: "Primitives/Card",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Card>;
let lorem_ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu rutrum dui, ac porttitor sem. Pellentesque faucibus vitae lorem ut luctus. Aliquam iaculis purus non lectus imperdiet, eget sagittis tortor vestibulum. Sed laoreet molestie nisl eget accumsan. Sed leo justo, suscipit ut arcu vel, maximus bibendum ipsum.`;
export const Variants: Story = (args) => (
  <div className="onvo-flex onvo-flex-col onvo-gap-2">
    <Card>
      <Title>Card title</Title>
      <Text>{lorem_ipsum}</Text>
    </Card>
  </div>
);
Variants.args = {};
