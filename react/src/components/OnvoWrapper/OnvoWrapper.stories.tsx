import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import OnvoWrapper from "./OnvoWrapper";
import { Button } from "@tremor/react";

const meta: Meta<typeof OnvoWrapper> = {
  component: OnvoWrapper,
  title: "Onvo/Wrapper",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof OnvoWrapper>;

export const Primary: Story = (args) => (
  <>
    <OnvoWrapper {...args}>
      <Button variant="primary">Hello world!</Button>
    </OnvoWrapper>
  </>
);
Primary.args = {
  token: "",
};
