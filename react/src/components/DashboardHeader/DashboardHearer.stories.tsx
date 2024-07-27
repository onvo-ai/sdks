import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DashboardHeader } from "./DashboardHeader";
import { Wrapper } from "../Wrapper/Wrapper";
import { Dashboard } from "../Dashboard/Dashboard";

const meta: Meta<typeof DashboardHeader> = {
  component: DashboardHeader,
  title: "Onvo/DashboardHeader",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{ token: string; baseUrl: string; id: string }>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <Dashboard id={args.id} adminMode>
        <DashboardHeader></DashboardHeader>
      </Dashboard>
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImE5MDRkZGUwLTA0YmMtNGUxMC1iNzk3LTY3NDA2NzU5MDQ5NiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE4MzkwMTk4fQ.s8ZYWmQ2KC4JaxToSTal6-38zvGF57fQ3-_y1iMU62Q",
  baseUrl: "http://localhost:3004",
  id: "a904dde0-04bc-4e10-b797-674067590496",
};
Primary.parameters = { layout: "fullscreen" };
