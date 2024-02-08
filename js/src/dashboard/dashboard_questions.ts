import OnvoBase from "../base";

export class OnvoDashboardQuestions extends OnvoBase {
  dashboardId: string;

  constructor(endpoint: string, apiKey: string, dashboardId: string) {
    super(endpoint, apiKey);
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
