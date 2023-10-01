import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DashboardHeader from "./DashboardHeader";
import OnvoWrapper from "../OnvoWrapper/OnvoWrapper";

const meta: Meta<typeof DashboardHeader> = {
  component: DashboardHeader,
  title: "Onvo/DashboardHeader",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DashboardHeader>;

export const Primary: Story = (args) => {
  return (
    <OnvoWrapper {...args}>
      <DashboardHeader />
    </OnvoWrapper>
  );
};

Primary.args = {
  token: "",
};
