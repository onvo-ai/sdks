import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Text, Label, Title, Metric } from "./Text";

const meta: Meta = {
  component: Text,
  title: "Tremor/Text",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Text>;
let lorem_ipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu rutrum dui, ac porttitor sem. Pellentesque faucibus vitae lorem ut luctus. Aliquam iaculis purus non lectus imperdiet, eget sagittis tortor vestibulum. Sed laoreet molestie nisl eget accumsan. Sed leo justo, suscipit ut arcu vel, maximus bibendum ipsum.`;
export const Variants: Story = (args) => (
  <div className="flex flex-col gap-2">
    <Metric>{lorem_ipsum}</Metric>
    <Title>{lorem_ipsum}</Title>
    <Label>{lorem_ipsum}</Label>
    <Text>{lorem_ipsum}</Text>
  </div>
);
Variants.args = {};
