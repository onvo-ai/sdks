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
    <main className="w-full min-h-[100vh]">
      <Wrapper token={token}>
        <Dashboard id={params.id}>
          <DashboardHeader />
          <DashboardGrid />
        </Dashboard>
      </Wrapper>
    </main>
  );
};

export default DashboardInnerPage;
