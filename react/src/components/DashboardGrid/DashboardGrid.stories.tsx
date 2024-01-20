import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DashboardGrid from "./DashboardGrid";
import Wrapper from "../Wrapper/Wrapper";

const meta: Meta<typeof DashboardGrid> = {
  component: DashboardGrid,
  title: "Onvo/DashboardGrid",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DashboardGrid>;

export const Primary: Story = (args) => {
  return (
    <Wrapper {...args}>
      <DashboardGrid />
    </Wrapper>
  );
};

Primary.args = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmQiOiI5ZDk1OWY2MS0yMTQ1LTQ1OTgtODJkNS03OWI4Mzc0Y2UzOGIiLCJzZXNzaW9uIjoiNjQ1MzhhYmEtNDdiMC00YjcwLTkwNzYtMGE3YjVjZDg0MDZiIn0sInN1YiI6ImVlNWIwOGM2LTUxNjctNDQyNS1iYmMzLWE3NDZmZTRhN2VhZC1hZThkOWI4Ni1hYjQzLTQxM2QtODVlNC04Yjk5Mzg3N2RlNTEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiaWF0IjoxNzA0MTgzMjM4fQ.uI5Bu6vH34wkIx9waD1-IH2Ww0D-MynHy1VCOEOa-7U",
  baseUrl: "http://localhost:3004",
};
