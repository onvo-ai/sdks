import OnvoBase from "../base";

export class OnvoDashboardSessions extends OnvoBase {
  dashboardId: string;

  constructor(endpoint: string, apiKey: string, dashboardId: string) {
    super(endpoint, apiKey);
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
