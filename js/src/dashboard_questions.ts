import { Method } from "axios";

export class OnvoDashboardQuestions {
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

  // Dashboard Question endpoints
  list() {
    return this.fetchBase("/api/dashboards/" + this.dashboardId + "/questions");
  }
  create(query: string) {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/questions?query=" + query,
      "PUT"
    );
  }
}
