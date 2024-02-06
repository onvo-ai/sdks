export class OnvoDashboardDatasources {
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
