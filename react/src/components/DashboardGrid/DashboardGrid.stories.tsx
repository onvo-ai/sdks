import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DashboardGrid from "./DashboardGrid";
import Wrapper from "../Wrapper/Wrapper";
import Dashboard from "../Dashboard/Dashboard";

const meta: Meta<typeof DashboardGrid> = {
  component: DashboardGrid,
  title: "Onvo/DashboardGrid",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{ token: string; baseUrl: string; id: string }>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <Dashboard id={args.id}>
        <DashboardGrid />
      </Dashboard>
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJyZXBvcnRzIjpbXSwiZGFzaGJvYXJkcyI6WyJmNzJlNTI4YS03NzIyLTRmNjctOTQ5OS04MDZkNzQ3MDE5OTIiXX0sInN1YiI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZC0xMjM0NTYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzA1ODUzNDAyfQ.64bWIpYFBn8y2WouNjCZ439JKBbSAu2wWOnMOO4MLIg",
  baseUrl: "http://localhost:3004",
  id: "f72e528a-7722-4f67-9499-806d74701992",
};
