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

type Story = StoryObj<typeof DashboardList & typeof Wrapper>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <DashboardList columns={args.columns} variant={args.variant} />
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
  baseUrl: "https://staging.onvo.ai",
  columns: 3,
  variant: "grid",
};
