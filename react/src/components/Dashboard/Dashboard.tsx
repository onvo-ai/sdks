import React, { createContext, useContext, useEffect, useState } from "react";
import { useBackend } from "../Wrapper";
import { Dashboard as DashboardType, Widget } from "@onvo-ai/js";
import usePrefersColorScheme from "use-prefers-color-scheme";

type DashboardContext = {
  id: string | undefined;
  dashboard?: DashboardType;
  widgets: Widget[];
  refresh: () => void;
  theme: "light" | "dark";
  selectedWidget: Widget | undefined;
  setSelectedWidget: (widget: Widget | undefined) => void;
};

const Context = createContext<DashboardContext>({
  id: undefined,
  dashboard: undefined,
  widgets: [],
  refresh: () => {},
  theme: "light",
  selectedWidget: undefined,
  setSelectedWidget: () => {},
});

export const Dashboard: React.FC<{
  id: string;
  children: any;
}> = ({ id, children }) => {
  const [dashboard, setDashboard] = useState<DashboardType>();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const backend = useBackend();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const prefersColorScheme = usePrefersColorScheme();
  const [selectedWidget, setSelectedWidget] = useState<Widget>();

  const refresh = () => {
    if (!backend) return;
    backend.dashboards.get(id).then(setDashboard);
    backend.widgets.list({ dashboard: id }).then(setWidgets);
  };

  useEffect(() => {
    if (id && backend) {
      refresh();
    }
  }, [id, backend]);
  useEffect(() => {
    if (dashboard) {
      if (dashboard.settings?.theme === "dark") {
        setTheme("dark");
      } else if (dashboard.settings?.theme === "light") {
        setTheme("light");
      } else {
        setTheme(prefersColorScheme === "dark" ? "dark" : "light");
      }
    }
  }, [dashboard, prefersColorScheme]);

  return (
    <Context.Provider
      value={{
        id,
        dashboard,
        widgets,
        refresh,
        theme,
        selectedWidget,
        setSelectedWidget,
      }}
    >
      <div className={`onvo-dashboard-context flex h-screen flex-col ${theme}`}>
        {children}
      </div>
    </Context.Provider>
  );
};
export const useDashboard = () => useContext(Context);
