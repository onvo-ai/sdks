import OnvoBase from "../base";
export class OnvoDashboardQuestions extends OnvoBase {
    dashboardId;
    constructor(endpoint, apiKey, dashboardId) {
        super(endpoint, apiKey);
        this.dashboardId = dashboardId;
    }
    // Dashboard Question endpoints
    list() {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/questions");
    }
    create(query) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/questions?query=" + query, "PUT");
    }
}
