import OnvoBase from "../base";
export class OnvoDashboardWidgets extends OnvoBase {
    dashboardId;
    constructor(endpoint, apiKey, dashboardId) {
        super(endpoint, apiKey);
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
