import React, { createContext, useContext, useEffect, useState } from "react";
import { useToken } from "../Wrapper";

type DashboardContext = {
  id: string | undefined;
  dashboard: any;
  widgets: any[];
  refresh: () => void;
};

const Context = createContext<DashboardContext>({
  id: undefined,
  dashboard: undefined,
  widgets: [],
  refresh: () => {},
});

export const Dashboard: React.FC<{ id: string; children: any }> = ({
  id,
  children,
}) => {
  const [dashboard, setDashboard] = useState();
  const [widgets, setWidgets] = useState([]);
  const { backend } = useToken();

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

  return (
    <Context.Provider value={{ id, dashboard, widgets, refresh }}>
      {children}
    </Context.Provider>
  );
};
export const useDashboard = () => useContext(Context);
