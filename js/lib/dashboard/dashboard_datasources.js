import OnvoBase from "../base";
export class OnvoDashboardDatasources extends OnvoBase {
    dashboardId;
    constructor(endpoint, apiKey, dashboardId) {
        super(endpoint, apiKey);
        this.dashboardId = dashboardId;
    }
    // Dashboard Datasource endpoints
    list() {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/datasources");
    }
    unlink(datasourceId) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/datasources/" + datasourceId, "DELETE");
    }
    link(datasourceId) {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/datasources", "PUT", {
            datasourceId: datasourceId,
        });
    }
}
