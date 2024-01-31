"use client";
import { Wrapper, DashboardList } from "@onvo-ai/react";

const DashboardGrid: React.FC<{ token: string }> = ({ token }) => {
  return (
    <Wrapper baseUrl="https://dashboard.onvo.ai" token={token}>
      <DashboardList />
    </Wrapper>
  );
};

export default DashboardGrid;
