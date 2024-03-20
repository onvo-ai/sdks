"use client";
import { Wrapper, DashboardList } from "@onvo-ai/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardGrid: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <Wrapper
      baseUrl={process.env.NEXT_PUBLIC_BASE_URL || "https://dashboard.onvo.ai"}
      token={token}
    >
      <DashboardList onClickItem={(e) => router.push(e.id)} />
    </Wrapper>
  );
};

export default DashboardGrid;
