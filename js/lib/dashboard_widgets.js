export class OnvoDashboardWidgets {
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
    // Dashboard Widget endpoints
    list() {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/widgets");
    }
    get(id) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/widgets/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/widgets/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/widgets/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/widgets", "PUT", body);
    }
}
