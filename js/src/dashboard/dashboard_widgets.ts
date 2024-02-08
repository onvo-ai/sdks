import OnvoBase from "../base";

export class OnvoDashboardWidgets extends OnvoBase {
  dashboardId: string;

  constructor(endpoint: string, apiKey: string, dashboardId: string) {
    super(endpoint, apiKey);
    this.dashboardId = dashboardId;
  }

  // Dashboard Widget endpoints
  list() {
    return this.fetchBase("/api/dashboards/" + this.dashboardId + "/widgets");
  }
  get(id: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/widgets/" + id
    );
  }
  delete(id: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/widgets/" + id,
      "DELETE"
    );
  }
  update(id: string, body: any) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/widgets/" + id,
      "POST",
      body
    );
  }
  create(body: any) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/widgets",
      "PUT",
      body
    );
  }
}
