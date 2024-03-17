import OnvoBase from "../base";
import { DashboardDatasource } from "../types";

export class OnvoDashboardDatasources extends OnvoBase {
  #dashboardId: string;

  constructor(
    dashboardId: string,
    apiKey: string,
    options?: { endpoint: string }
  ) {
    super(apiKey, options);
    this.#dashboardId = dashboardId;
  }

  // Dashboard Datasource endpoints
  list() {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources"
    ) as Promise<DashboardDatasource[]>;
  }
  unlink(datasourceId: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources/" + datasourceId,
      "DELETE"
    ) as Promise<{ success: true }>;
  }
  link(datasourceId: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.#dashboardId + "/datasources",
      "PUT",
      {
        datasourceId: datasourceId,
      }
    ) as Promise<DashboardDatasource>;
  }
}
