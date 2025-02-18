import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { WidgetLibrary } from "./WidgetLibrary";
import { Wrapper } from "../../layouts/Wrapper";
import { DashboardWrapper } from "../../layouts/Dashboard";

const meta: Meta<typeof WidgetLibrary> = {
  component: WidgetLibrary,
  title: "Components/Widget Library",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{
  token: string;
  baseUrl: string;
  id: string;
  adminMode: boolean;
}>;

export const Primary: Story = (args) => {
  return (
    <div className="onvo-h-screen onvo-w-screen onvo-relative">
      <Wrapper {...args}>
        <DashboardWrapper id={args.id}>
          <div className="onvo-@container/questionmodal onvo-w-full onvo-relative onvo-max-w-screen-lg onvo-mx-auto">
            <WidgetLibrary onExpanded={() => {}} />
          </div>
        </DashboardWrapper>
      </Wrapper>
    </div>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImFlNWIxZGRlLTFmZjUtNDk2Ny1hZmUxLTYzOWI3NTVjNzEwMiJdLCJwYXJlbnRfdGVhbSI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZCJ9LCJzdWIiOiI1ODk5Zjk5ZC1hNDQ5LTRiZmEtODc2OS0xOWMwOTdhYWYxZjYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzE5MzA3MDgxfQ.230JQNigbv9HOSXms9m-JGKlpGveuD3-_bR3XdqRhEk",
  baseUrl: "http://localhost:3004",
  id: "ae5b1dde-1ff5-4967-afe1-639b755c7102",
};

Primary.parameters = { layout: "fullscreen" };
