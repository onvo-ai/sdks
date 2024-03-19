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
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
  baseUrl: "https://staging.onvo.ai",
  id: "f90182a2-f485-45a8-a9d6-b72021c03b50",
};

Primary.parameters = { layout: "fullscreen" };
