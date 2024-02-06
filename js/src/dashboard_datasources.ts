import { Method } from "axios";

export class OnvoDashboardDatasources {
  apiKey: string;
  endpoint: string;
  dashboardId: string;

  fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;

  constructor(
    endpoint: string,
    apiKey: string,
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>,
    dashboardId: string
  ) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.fetchBase = fetchBase;
    this.dashboardId = dashboardId;
  }

  // Dashboard Datasource endpoints
  list() {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/datasources"
    );
  }
  unlink(datasourceId: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/datasources/" + datasourceId,
      "DELETE"
    );
  }
  link(datasourceId: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/datasources",
      "PUT",
      {
        datasourceId: datasourceId,
      }
    );
  }
}
