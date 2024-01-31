"use client";
import { Wrapper, DashboardList } from "@onvo-ai/react";
import { useRouter } from "next/navigation";

const DashboardGrid: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  localStorage.setItem("token", token);
  return (
    <Wrapper baseUrl="https://dashboard.onvo.ai" token={token}>
      <DashboardList onClickItem={(e) => router.push(e.id)} />
    </Wrapper>
  );
};

export default DashboardGrid;
