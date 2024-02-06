import { Method } from "axios";

export class OnvoDashboardWidgets {
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
