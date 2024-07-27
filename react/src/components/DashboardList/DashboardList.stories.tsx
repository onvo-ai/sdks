import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DashboardList } from "./DashboardList";
import { Wrapper } from "../Wrapper/Wrapper";

const meta: Meta<typeof DashboardList> = {
  component: DashboardList,
  title: "Layouts/Dashboard List",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  columns: number;
  variant: string;
}>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <DashboardList columns={args.columns} variant={args.variant} />
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
  baseUrl: "http://localhost:3004",
  columns: 3,
  variant: "grid",
};
