import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";
import { Wrapper } from "../Wrapper/Wrapper";
import { DashboardHeader } from "../DashboardHeader/DashboardHeader";
import { DashboardGrid } from "../DashboardGrid/DashboardGrid";
import { QuestionModal } from "../QuestionModal/QuestionModal";
import { CreateToolbar } from "../CreateToolbar";

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: "Layouts/Dashboard",
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
            <QuestionModal variant="fullscreen" trigger={<CreateToolbar />} />
          </Dashboard>
        </Wrapper>
      </div>
    </div>
  );
};

Embedded.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
  baseUrl: "http://localhost:3004",
  id: "ae5b1dde-1ff5-4967-afe1-639b755c7102",
  width: 1024,
  height: 600,
};

Embedded.parameters = { layout: "fullscreen" };
