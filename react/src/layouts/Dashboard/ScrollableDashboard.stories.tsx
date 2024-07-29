import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";
import { Wrapper } from "../Wrapper/Wrapper";

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

export const Scrollable: Story = (args) => {
  return (
    <div className="onvo-relative onvo-w-screen onvo-bg-slate-700">
      <div className="onvo-h-[1000px] onvo-w-[200px] onvo-bg-red-500"></div>
      <div
        className="onvo-overflow-y-auto onvo-mx-auto onvo-rounded-xl"
        style={{ width: args.width, height: args.height }}
      >
        <Wrapper {...args}>
          <Dashboard id={args.id} adminMode={args.adminMode}></Dashboard>
        </Wrapper>
      </div>
    </div>
  );
};

Scrollable.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
  baseUrl: "http://localhost:3004",
  id: "ae5b1dde-1ff5-4967-afe1-639b755c7102",
  width: 1024,
  height: 600,
};

Scrollable.parameters = { layout: "fullscreen" };
