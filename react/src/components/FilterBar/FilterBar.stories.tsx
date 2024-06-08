import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "./FilterBar";
import { Wrapper } from "../Wrapper/Wrapper";
import { Dashboard } from "../Dashboard";

const meta: Meta<typeof FilterBar> = {
  component: FilterBar,
  title: "Onvo/FilterBar",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  id: string;
}>;

export const Standalone: Story = (args) => {
  return (
    <div className="onvo-h-screen onvo-w-screen">
      <Wrapper {...args}>
        <Dashboard id={args.id}>
          <FilterBar />
        </Dashboard>
      </Wrapper>
    </div>
  );
};

Standalone.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImQ3YTBhYzE2LWNjMzUtNDIwNy1hNzRjLWJlZGJmM2RhYzkyMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiJhNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE0NDE4NzEwfQ.w4nFZbvruIEA5Ah5V2BUHyANHVaF5N-AImlrYnEXRo0",
  baseUrl: "http://localhost:3004",
  id: "d7a0ac16-cc35-4207-a74c-bedbf3dac922",
};

Standalone.parameters = { layout: "fullscreen" };
