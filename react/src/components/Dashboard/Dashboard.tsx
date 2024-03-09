import React, { createContext, useContext, useEffect, useState } from "react";
import { useToken } from "../Wrapper";
import { Dashboard as DashboardType, Widget } from "@onvo-ai/js";
import usePrefersColorScheme from "use-prefers-color-scheme";

type DashboardContext = {
  id: string | undefined;
  dashboard: any;
  widgets: any[];
  refresh: () => void;
  theme: "light" | "dark";
};

const Context = createContext<DashboardContext>({
  id: undefined,
  dashboard: undefined,
  widgets: [],
  refresh: () => {},
  theme: "light",
});

export const Dashboard: React.FC<{
  id: string;
  children: any;
}> = ({ id, children }) => {
  const [dashboard, setDashboard] = useState<DashboardType>();
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const { backend } = useToken();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const prefersColorScheme = usePrefersColorScheme();

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
    <Context.Provider value={{ id, dashboard, widgets, refresh, theme }}>
      <div className={theme}>{children}</div>
    </Context.Provider>
  );
};
export const useDashboard = () => useContext(Context);
