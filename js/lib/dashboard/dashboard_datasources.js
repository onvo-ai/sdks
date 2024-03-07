import OnvoBase from "../base.js";
export class OnvoDashboardDatasources extends OnvoBase {
    #dashboardId;
    constructor(dashboardId, apiKey, options) {
        super(apiKey, options);
        this.#dashboardId = dashboardId;
    }
    // Dashboard Datasource endpoints
    list() {
        return this.fetchBase("/api/dashboards/" + this.#dashboardId + "/datasources");
    }
    unlink(datasourceId) {
        return this.fetchBase("/api/dashboards/" + this.#dashboardId + "/datasources/" + datasourceId, "DELETE");
    }
    link(datasourceId) {
        return this.fetchBase("/api/dashboards/" + this.#dashboardId + "/datasources", "PUT", {
            datasourceId: datasourceId,
        });
    }
}
