import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Wrapper from "./Wrapper";
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
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJyZXBvcnRzIjpbXSwiZGFzaGJvYXJkcyI6WyJmNzJlNTI4YS03NzIyLTRmNjctOTQ5OS04MDZkNzQ3MDE5OTIiXX0sInN1YiI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZC0xMjM0NTYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzA1ODUzNDAyfQ.64bWIpYFBn8y2WouNjCZ439JKBbSAu2wWOnMOO4MLIg",
  baseUrl: "http://localhost:3004",
};
