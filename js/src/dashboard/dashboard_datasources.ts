import OnvoBase from "../base";

export class OnvoDashboardDatasources extends OnvoBase {
  dashboardId: string;

  constructor(endpoint: string, apiKey: string, dashboardId: string) {
    super(endpoint, apiKey);
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
