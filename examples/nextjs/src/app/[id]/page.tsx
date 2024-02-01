"use client";
import {
  Wrapper,
  Dashboard,
  DashboardHeader,
  DashboardGrid,
} from "@onvo-ai/react";

const DashboardInnerPage: React.FC<{
  params: { id: string };
}> = ({ params }) => {
  let token = localStorage.getItem("token") || "";
  return (
    <Wrapper baseUrl="https://dashboard.onvo.ai" token={token}>
      <Dashboard id={params.id}>
        <DashboardHeader />
        <DashboardGrid />
      </Dashboard>
    </Wrapper>
  );
};

export default DashboardInnerPage;
