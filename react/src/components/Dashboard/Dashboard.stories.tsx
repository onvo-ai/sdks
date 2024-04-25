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
}>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <Dashboard id={args.id}>
        <DashboardHeader />
        <DashboardGrid />
        <QuestionModal />
      </Dashboard>
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImUxOTg5ZTE4LTczZDctNDFhMi1hZWIyLTg2MzY3YmIyMTc3ZSJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiJhNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE0MDI3NzYxfQ.vsoRaiS5K9Hjy6ekdo6L87M3wn9HsuoM4ykABA73N_Q",
  baseUrl: "http://localhost:3004",
  id: "e1989e18-73d7-41a2-aeb2-86367bb2177e",
};

Primary.parameters = { layout: "fullscreen" };
