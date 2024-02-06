import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToken } from "../Wrapper";

type DashboardContext = {
  id: string | undefined;
  dashboard: any;
  widgets: any[];
};

const Context = createContext<DashboardContext>({
  id: undefined,
  dashboard: undefined,
  widgets: [],
});

export const Dashboard: React.FC<{ id: string; children: any }> = ({
  id,
  children,
}) => {
  const [dashboard, setDashboard] = useState();
  const [widgets, setWidgets] = useState([]);
  const { backend } = useToken();

  useEffect(() => {
    if (id && backend) {
      // @ts-ignore
      backend.dashboards.get(id).then(setDashboard);
      backend.dashboard(id).widgets.list().then(setWidgets);
    }
  }, [id, backend]);

  return (
    <Context.Provider value={{ id, dashboard, widgets }}>
      {children}
    </Context.Provider>
  );
};
export const useDashboard = () => useContext(Context);
