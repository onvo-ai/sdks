import React, { useEffect } from "react";
import { Card } from "../../tremor/Card";
import { Title, Text } from "../../tremor/Text";
import { useDashboard } from "./useDashboard";
import { useBackend } from "../Wrapper";
import { useTheme } from "./useTheme";
import { DashboardHeader } from "../../components/DashboardHeader";
import { DashboardGrid } from "../../components/DashboardGrid";
import { Copilot } from "../Copilot";
import { CreateToolbar } from "../../components/CreateToolbar";

export const DashboardWrapper: React.FC<{
  id: string;
  adminMode?: boolean;
  children: React.ReactNode;
}> = ({ id: dashboardId, adminMode, children }) => {
  const { backend } = useBackend();
  const { setId, setAdminMode, refreshWidgets } = useDashboard();

  useEffect(() => {
    if (dashboardId && backend) {
      setId(dashboardId, backend);
      setAdminMode(adminMode || false);
      refreshWidgets(backend);
    }
  }, [dashboardId, backend, adminMode]);
  return children;
};

export const Dashboard: React.FC<{
  id: string;
  adminMode?: boolean;
  className?: string;
}> = ({ id: dashboardId, adminMode, className }) => {
  const { subscription, subscriptionLoaded } = useBackend();
  const theme = useTheme();
  const { dashboard } = useDashboard();

  const style = dashboard?.settings?.custom_css || "";

  const paymentModalOpen =
    subscriptionLoaded && dashboard && subscription === undefined;

  return (
    <DashboardWrapper id={dashboardId} adminMode={adminMode}>
      <div
        key={theme === "dark" ? "dark" : "light"}
        className={`onvo-dashboard-context onvo-relative onvo-scrollbar-thumb-rounded-full onvo-scrollbar-track-transparent onvo-translate-x-0 onvo-h-full onvo-background-color onvo-flex onvo-flex-col ${
          theme === "dark"
            ? "onvo-dark onvo-scrollbar-thumb-slate-500"
            : "onvo-scrollbar-thumb-slate-400"
        } ${className}`}
      >
        <style>{style}</style>

        {paymentModalOpen && (
          <div className="onvo-absolute onvo-top-0 onvo-left-0 onvo-right-0 onvo-bottom-0 onvo-bg-black/50 onvo-z-[1000] onvo-backdrop-blur-md onvo-flex onvo-justify-center onvo-items-center">
            <Card className="onvo-max-w-screen-md">
              <Title>Dashboard unavailable</Title>
              <Text>
                The dashboard you are trying to access is currently unavailable.
                If you are the administrator, click{" "}
                <a
                  href="https://dashboard.onvo.ai/settings/billing"
                  className="onvo-text-blue-500 onvo-underline"
                >
                  here
                </a>{" "}
                to update your billing.
              </Text>
            </Card>
          </div>
        )}

        <DashboardHeader />
        <DashboardGrid />
        <Copilot
          dashboardId={dashboardId}
          adminMode={adminMode}
          variant="fullscreen"
          trigger={<CreateToolbar />}
        />
      </div>
    </DashboardWrapper>
  );
};
