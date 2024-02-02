import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DashboardList } from "./DashboardList";
import { Wrapper } from "../Wrapper/Wrapper";

const meta: Meta<typeof DashboardList> = {
  component: DashboardList,
  title: "Onvo/DashboardList",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DashboardList & typeof Wrapper>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <DashboardList columns={args.columns} variant={args.variant} />
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJyZXBvcnRzIjpbXSwiZGFzaGJvYXJkcyI6WyJmNzJlNTI4YS03NzIyLTRmNjctOTQ5OS04MDZkNzQ3MDE5OTIiXX0sInN1YiI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZC0xMjM0NTYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzA1ODUzNDAyfQ.64bWIpYFBn8y2WouNjCZ439JKBbSAu2wWOnMOO4MLIg",
  baseUrl: "https://dashboard.onvo.ai",
  columns: 3,
  variant: "grid",
};
