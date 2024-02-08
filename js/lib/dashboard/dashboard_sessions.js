import OnvoBase from "../base";
export class OnvoDashboardSessions extends OnvoBase {
    dashboardId;
    constructor(endpoint, apiKey, dashboardId) {
        super(endpoint, apiKey);
        this.dashboardId = dashboardId;
    }
    // Dashboard Session endpoints
    list() {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/sessions");
    }
    delete() {
        return this.fetchBase("/api/dashboards/" + this.dashboardId + "/sessions", "DELETE");
    }
    async upsert({ userId, parameters, }) {
        let data = await this.fetchBase("/api/dashboards/" + this.dashboardId + "/sessions", "POST", {
            user: userId,
            parameters: parameters,
        });
        return { ...data, url: this.endpoint + data.url };
    }
}
