import { Method } from "axios";

export class OnvoDashboardSessions {
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

  // Dashboard Session endpoints
  list() {
    return this.fetchBase("/api/dashboards/" + this.dashboardId + "/sessions");
  }
  delete() {
    return this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/sessions",
      "DELETE"
    );
  }
  async upsert({
    userId,
    parameters,
  }: {
    userId: string;
    parameters?: { [key: string]: any };
  }) {
    let data: any = await this.fetchBase(
      "/api/dashboards/" + this.dashboardId + "/sessions",
      "POST",
      {
        user: userId,
        parameters: parameters,
      }
    );

    return { ...data, url: this.endpoint + data.url };
  }
}
