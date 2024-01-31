import axios, { Method } from "axios";

export default class Onvo {
  apiKey: string;
  endpoint: string;

  constructor(endpoint: string, apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async fetchBase(url: string, method?: Method, body?: any) {
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
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("Error in making the request: " + error.message);
      }
    }
  }

  // Account endpoints
  getAccounts() {
    return this.fetchBase("/api/accounts");
  }
  getAccountById(id: string) {
    return this.fetchBase("/api/accounts/" + id);
  }

  // Team endpoints
  getTeams() {
    return this.fetchBase("/api/teams");
  }
  getTeamById(id: string) {
    return this.fetchBase("/api/teams/" + id);
  }

  // Embed user endpoints
  getEmbedUsers() {
    return this.fetchBase("/api/embed-users");
  }
  getEmbedUserById(id: string) {
    return this.fetchBase("/api/embed-users/" + id);
  }
  deleteEmbedUserById(id: string) {
    return this.fetchBase("/api/embed-users/" + id, "DELETE");
  }
  upsertEmbedUser(
    userId: string,
    userData: {
      name: string;
      email: string;
      metadata: { [key: string]: any };
    }
  ) {
    return this.fetchBase("/api/embed-users", "POST", {
      id: userId,
      name: userData.name,
      email: userData.email,
      metadata: userData.metadata,
    });
  }
  getEmbedUserAccessToken(id: string) {
    return this.fetchBase("/api/embed-users/" + id + "/token");
  }

  // Datasource user endpoints
  getDatasources() {
    return this.fetchBase("/api/datasources");
  }
  getDatasourceById(id: string) {
    return this.fetchBase("/api/datasources/" + id);
  }
  getDatasourceDataById(id: string) {
    return this.fetchBase("/api/datasources/" + id + "/data");
  }
  populateDatasourceDataById(id: string) {
    return this.fetchBase(
      "/api/datasources/" + id + "/populate-columns",
      "POST"
    );
  }
  deleteDatasourceById(id: string) {
    return this.fetchBase("/api/datasources/" + id, "DELETE");
  }
  updateDatasourceById(id: string, body: any) {
    return this.fetchBase("/api/datasources/" + id, "POST", body);
  }
  createDatasource(body: any) {
    return this.fetchBase("/api/datasources", "PUT", body);
  }

  // Automation endpoints
  getAutomations() {
    return this.fetchBase("/api/automations");
  }
  getAutomationById(id: string) {
    return this.fetchBase("/api/automations/" + id);
  }
  deleteAutomationById(id: string) {
    return this.fetchBase("/api/automations/" + id, "DELETE");
  }
  updateAutomationById(id: string, body: any) {
    return this.fetchBase("/api/automations/" + id, "POST", body);
  }
  createAutomation(body: any) {
    return this.fetchBase("/api/automations", "PUT", body);
  }

  // Dashboard endpoints
  getDashboards() {
    return this.fetchBase("/api/dashboards");
  }
  getDashboardById(id: string) {
    return this.fetchBase("/api/dashboards/" + id);
  }
  deleteDashboardById(id: string) {
    return this.fetchBase("/api/dashboards/" + id, "DELETE");
  }
  updateDashboardById(id: string, body: any) {
    return this.fetchBase("/api/dashboards/" + id, "POST", body);
  }
  createDashboard(body: any) {
    return this.fetchBase("/api/dashboards", "PUT", body);
  }

  // Dashboard Widget endpoints
  getDashboardWidgets(dashboardId: string) {
    return this.fetchBase("/api/dashboards/" + dashboardId + "/widgets");
  }
  getDashboardWidgetById(dashboardId: string, widgetId: String) {
    return this.fetchBase(
      "/api/dashboards/" + dashboardId + "/widgets/" + widgetId
    );
  }
  deleteDashboardWidgetById(dashboardId: string, widgetId: string) {
    return this.fetchBase(
      "/api/dashboards/" + dashboardId + "/widgets/" + widgetId,
      "DELETE"
    );
  }
  updateDashboardWidgetById(id: string, body: any) {
    return this.fetchBase("/api/dashboards/" + id, "POST", body);
  }
  createDashboardWidget(body: any) {
    return this.fetchBase("/api/dashboards", "PUT", body);
  }

  // Dashboard Question endpoints
  getDashboardQuestionsById(dashboardId: string) {
    return this.fetchBase("/api/dashboards/" + dashboardId + "/questions");
  }
  askDashboardQuestion(dashboardId: string, query: string) {
    return this.fetchBase(
      "/api/dashboards/" + dashboardId + "/questions?query=" + query,
      "PUT"
    );
  }

  // Dashboard Session endpoints
  getDashboardSessionsById(dashboardId: string) {
    return this.fetchBase("/api/dashboards/" + dashboardId + "/sessions");
  }
  deleteDashboardSessionsById(dashboardId: string) {
    return this.fetchBase(
      "/api/dashboards/" + dashboardId + "/sessions",
      "DELETE"
    );
  }
  async upsertDashboardSession({
    dashboardId,
    userId,
    parameters,
  }: {
    dashboardId: string;
    userId: string;
    parameters?: { [key: string]: any };
  }) {
    let data: any = await this.fetchBase(
      "/api/dashboards/" + dashboardId + "/sessions",
      "POST",
      {
        user: userId,
        parameters: parameters,
      }
    );

    return { ...data, url: this.endpoint + data.url };
  }
}
