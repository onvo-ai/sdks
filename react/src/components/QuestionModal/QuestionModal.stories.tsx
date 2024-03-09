import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { QuestionModal } from "./QuestionModal";
import { Wrapper } from "../Wrapper/Wrapper";
import { Dashboard } from "../Dashboard/Dashboard";

const meta: Meta<typeof QuestionModal> = {
  component: QuestionModal,
  title: "Onvo/QuestionModal",
  argTypes: {},
};
export default meta;

type Story = StoryObj<{ token: string; baseUrl: string; id: string }>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <Dashboard id={args.id}>
        <QuestionModal />
      </Dashboard>
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
  baseUrl: "https://staging.onvo.ai",
  id: "1ca1e66c-0f5b-43fc-91aa-954c3377deba",
};
