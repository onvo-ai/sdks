import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DashboardGrid } from "./DashboardGrid";
import { Wrapper } from "../Wrapper/Wrapper";
import { Dashboard } from "../Dashboard/Dashboard";

const meta: Meta<typeof DashboardGrid> = {
  component: DashboardGrid,
  title: "Onvo/DashboardGrid",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  id: string;
  spacing?: number;
}>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <Dashboard id={args.id}>
        <DashboardGrid spacing={args.spacing} />
      </Dashboard>
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImQ3YTBhYzE2LWNjMzUtNDIwNy1hNzRjLWJlZGJmM2RhYzkyMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiJhNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE0NDE4NzEwfQ.w4nFZbvruIEA5Ah5V2BUHyANHVaF5N-AImlrYnEXRo0",
  baseUrl: "http://localhost:3004",
  id: "d7a0ac16-cc35-4207-a74c-bedbf3dac922",
};
Primary.parameters = { layout: "fullscreen" };
