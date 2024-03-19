import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DashboardList } from "./DashboardList";
import { Wrapper } from "../Wrapper/Wrapper";

const meta: Meta<typeof DashboardList> = {
  component: DashboardList,
  title: "Onvo/DashboardList",
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
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
  baseUrl: "https://staging.onvo.ai",
  columns: 3,
  variant: "grid",
};
