import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Backend from "../../backend";
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

const Dashboard: React.FC<{ id: string; children: any }> = ({
  id,
  children,
}) => {
  const [dashboard, setDashboard] = useState();
  const [widgets, setWidgets] = useState([]);
  const { backend } = useToken();

  useEffect(() => {
    if (id && backend) {
      backend.getDashboard(id).then(setDashboard);
      backend.getDashboardWidgets(id).then(setWidgets);
    }
  }, [id, backend]);

  return (
    <Context.Provider value={{ id, dashboard, widgets }}>
      {children}
    </Context.Provider>
  );
};
export default Dashboard;
export const useDashboard = () => useContext(Context);
