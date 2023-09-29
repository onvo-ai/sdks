import fetch from "node-fetch";
export default class Onvo {
    apiKey;
    endpoint;
    constructor(endpoint, apiKey) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
    }
    async fetchBase(url, method, body) {
        let response = await fetch(this.endpoint + url, {
            method: method || "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        let json = await response.json();
        if (response.ok) {
            return json;
        }
        else {
            throw new Error(json.message);
        }
    }
    identifyUser(userId, userData) {
        return this.fetchBase("/api/embed-users", "POST", {
            id: userId,
            name: userData.name,
            email: userData.email,
            metadata: userData.metadata,
        });
    }
    async getDashboards() {
        return this.fetchBase("/api/dashboards");
    }
    async getReports() {
        return this.fetchBase("/api/reports");
    }
    async createDashboardSession({ dashboardId, userId, parameters, }) {
        let data = await this.fetchBase("/api/dashboards/" + dashboardId + "/sessions", "POST", {
            user: userId,
            parameters: parameters,
        });
        return { ...data, url: this.endpoint + data.url };
    }
    async createReportSession({ reportId, userId, parameters, }) {
        let data = await this.fetchBase("/api/reports/" + reportId + "/sessions", "POST", {
            user: userId,
            parameters: parameters,
        });
        return { ...data, url: this.endpoint + data.url };
    }
}
