import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";
import { Wrapper } from "../Wrapper/Wrapper";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { DashboardGrid } from "../DashboardGrid/DashboardGrid";
import { QuestionModal } from "../QuestionModal/QuestionModal";

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: "Onvo/Dashboard",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  id: string;
  width: number;
  height: number;
  adminMode: boolean;
}>;

export const Embedded: Story = (args) => {
  return (
    <div className="onvo-relative onvo-w-screen onvo-h-screen onvo-flex onvo-justify-between onvo-items-center onvo-bg-slate-700">
      <div
        className="onvo-overflow-y-auto onvo-mx-auto onvo-rounded-xl"
        style={{ width: args.width, height: args.height }}
      >
        <Wrapper {...args}>
          <Dashboard id={args.id} adminMode={args.adminMode}>
            <DashboardHeader />
            <DashboardGrid />
            <QuestionModal />
          </Dashboard>
        </Wrapper>
      </div>
    </div>
  );
};

Embedded.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImQ3YTBhYzE2LWNjMzUtNDIwNy1hNzRjLWJlZGJmM2RhYzkyMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiJhNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE0NDE4NzEwfQ.w4nFZbvruIEA5Ah5V2BUHyANHVaF5N-AImlrYnEXRo0",
  baseUrl: "http://localhost:3004",
  id: "d7a0ac16-cc35-4207-a74c-bedbf3dac922",
  width: 1024,
  height: 600,
};

Embedded.parameters = { layout: "fullscreen" };
