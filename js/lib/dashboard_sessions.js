export class OnvoDashboardSessions {
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
