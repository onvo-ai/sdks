export class OnvoDashboardQuestions {
    apiKey;
    endpoint;
    dashboardId;
    fetchBase;
    constructor(endpoint, apiKey, fetchBase, dashboardId) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
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
