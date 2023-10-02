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
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmQiOiIwNDFkM2Q4ZS1kYTA1LTRlZjktODVlMS04NjNjZDY0ODQ5Y2EiLCJzZXNzaW9uIjoiNjY0NDkyODUtMDU3OC00ZGU2LWE3MDEtMzYxOGUyMGQ5YWQzIn0sInN1YiI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZC01ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNjk2MTg1MjE2fQ.NpmZ7zUPG-RFyzbTp-SIJ4E0XYSaN-lSUW1tFjCPt1g",
  baseUrl: "http://localhost:3004",
};
