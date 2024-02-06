import axios from "axios";
export default class Onvo {
    apiKey;
    endpoint;
    constructor(endpoint, apiKey) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
    }
    async fetchBase(url, method, body) {
        try {
            const response = await axios({
                method: method || "GET",
                url: this.endpoint + url,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey,
                },
                data: body,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            else if (error.request) {
                throw new Error("No response received from the server");
            }
            else {
                throw new Error("Error in making the request: " + error.message);
            }
        }
    }
    // Account endpoints
    getAccounts() {
        return this.fetchBase("/api/accounts");
    }
    getAccountById(id) {
        return this.fetchBase("/api/accounts/" + id);
    }
    // Team endpoints
    getTeams() {
        return this.fetchBase("/api/teams");
    }
    getTeamById(id) {
        return this.fetchBase("/api/teams/" + id);
    }
    // Embed user endpoints
    getEmbedUsers() {
        return this.fetchBase("/api/embed-users");
    }
    getEmbedUserById(id) {
        return this.fetchBase("/api/embed-users/" + id);
    }
    deleteEmbedUserById(id) {
        return this.fetchBase("/api/embed-users/" + id, "DELETE");
    }
    upsertEmbedUser(userId, userData) {
        return this.fetchBase("/api/embed-users", "POST", {
            id: userId,
            name: userData.name,
            email: userData.email,
            metadata: userData.metadata,
        });
    }
    getEmbedUserAccessToken(id) {
        return this.fetchBase("/api/embed-users/" + id + "/token");
    }
    // Datasource user endpoints
    getDatasources() {
        return this.fetchBase("/api/datasources");
    }
    getDatasourceById(id) {
        return this.fetchBase("/api/datasources/" + id);
    }
    getDatasourceDataById(id) {
        return this.fetchBase("/api/datasources/" + id + "/data");
    }
    populateDatasourceDataById(id) {
        return this.fetchBase("/api/datasources/" + id + "/populate-columns", "POST");
    }
    deleteDatasourceById(id) {
        return this.fetchBase("/api/datasources/" + id, "DELETE");
    }
    updateDatasourceById(id, body) {
        return this.fetchBase("/api/datasources/" + id, "POST", body);
    }
    createDatasource(body) {
        return this.fetchBase("/api/datasources", "PUT", body);
    }
    // Automation endpoints
    getAutomations() {
        return this.fetchBase("/api/automations");
    }
    getAutomationById(id) {
        return this.fetchBase("/api/automations/" + id);
    }
    deleteAutomationById(id) {
        return this.fetchBase("/api/automations/" + id, "DELETE");
    }
    updateAutomationById(id, body) {
        return this.fetchBase("/api/automations/" + id, "POST", body);
    }
    createAutomation(body) {
        return this.fetchBase("/api/automations", "PUT", body);
    }
    // Dashboard endpoints
    getDashboards() {
        return this.fetchBase("/api/dashboards");
    }
    getDashboardById(id) {
        return this.fetchBase("/api/dashboards/" + id);
    }
    deleteDashboardById(id) {
        return this.fetchBase("/api/dashboards/" + id, "DELETE");
    }
    updateDashboardById(id, body) {
        return this.fetchBase("/api/dashboards/" + id, "POST", body);
    }
    createDashboard(body) {
        return this.fetchBase("/api/dashboards", "PUT", body);
    }
    // Dashboard Widget endpoints
    getDashboardWidgets(dashboardId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/widgets");
    }
    getDashboardWidgetById(dashboardId, widgetId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/widgets/" + widgetId);
    }
    deleteDashboardWidgetById(dashboardId, widgetId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/widgets/" + widgetId, "DELETE");
    }
    updateDashboardWidgetById(dashboardId, widgetId, body) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/widgets/" + widgetId, "POST", body);
    }
    createDashboardWidget(dashboardId, body) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/widgets", "PUT", body);
    }
    // Dashboard Question endpoints
    getDashboardQuestionsById(dashboardId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/questions");
    }
    askDashboardQuestion(dashboardId, query) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/questions?query=" + query, "PUT");
    }
    // Dashboard Session endpoints
    getDashboardSessionsById(dashboardId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/sessions");
    }
    deleteDashboardSessionsById(dashboardId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/sessions", "DELETE");
    }
    async upsertDashboardSession({ dashboardId, userId, parameters, }) {
        let data = await this.fetchBase("/api/dashboards/" + dashboardId + "/sessions", "POST", {
            user: userId,
            parameters: parameters,
        });
        return { ...data, url: this.endpoint + data.url };
    }
    // Dashboard Datasource endpoints
    getDashboardDatasources(dashboardId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/datasources");
    }
    unlinkDashboardDatasourceById(dashboardId, datasourceId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/datasources/" + datasourceId, "DELETE");
    }
    linkDashboardDatasource(dashboardId, datasourceId) {
        return this.fetchBase("/api/dashboards/" + dashboardId + "/datasources", "PUT", {
            datasourceId: datasourceId,
        });
    }
}
