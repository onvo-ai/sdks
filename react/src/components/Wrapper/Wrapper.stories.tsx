import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Wrapper } from "./Wrapper";
import { Button } from "@tremor/react";

const meta: Meta<typeof Wrapper> = {
  component: Wrapper,
  title: "Onvo/Wrapper",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Wrapper>;

export const Primary: Story = (args) => (
  <>
    <Wrapper {...args}>
      <Button variant="primary">Hello world!</Button>
    </Wrapper>
  </>
);
Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
  baseUrl: "https://staging.onvo.ai",
};
