import { create } from "zustand";
import Onvo, { Dashboard, Widget } from "@onvo-ai/js";

interface DashboardState {
  id: string | undefined;
  loading: boolean;
  dashboard: Dashboard | undefined;
  widgets: Widget[];
  setId: (id: string, backend: Onvo) => void;
  setDashboard: (dashboard: Dashboard | undefined) => void;
  setWidgets: (widgets: Widget[]) => void;
  refreshDashboard: (backend: Onvo) => Promise<void>;
  refreshWidgets: (backend: Onvo) => Promise<void>;
}

export const useDashboard = create<DashboardState>((set, get) => ({
  id: undefined,
  loading: false,
  dashboard: undefined,
  widgets: [],
  setId: (id, backend) => {
    let loading = get().loading;
    set({ id, loading: true });

    backend.dashboards.get(id).then((dash) => {
      set({
        dashboard: dash,
        loading: false,
      });

      if (
        !loading &&
        new Date(dash.last_updated_at).getTime() + 300000 < new Date().getTime()
      ) {
        backend
          ?.dashboard(id)
          .updateWidgetCache()
          .then((data) => {

            let id = get().id;
            if (id === data[0].dashboard) {
              set({
                widgets: data,
                loading: false,
                dashboard: {
                  ...dash,
                  last_updated_at: new Date().toISOString(),
                },
              });
            }
          });
      }
    });
  },
  setDashboard: (dashboard) => set({ dashboard }),
  setWidgets: (widgets) => set({ widgets }),
  refreshWidgets: async (backend) => {
    let id = get().id;
    if (!id) return;
    await backend.widgets.list({ dashboard: id }).then((wid) => {
      set({ widgets: wid });
    });
  },
  refreshDashboard: async (backend) => {
    let id = get().id;
    if (!id) return;
    await backend.dashboards.get(id).then((dash) => {
      set({ dashboard: dash });
    });
  },
}));
