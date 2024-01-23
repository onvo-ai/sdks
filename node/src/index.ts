import fetch from "node-fetch";

export default class Onvo {
  apiKey: string;
  endpoint: string;

  constructor(endpoint: string, apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  async fetchBase(
    url: string,
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any
  ) {
    let response = await fetch(this.endpoint + url, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    let json: any = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.message);
    }
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

  async getDashboards() {
    return this.fetchBase("/api/dashboards");
  }

  async getDashboardById(id: string) {
    return this.fetchBase("/api/dashboards/" + id);
  }

  async createDashboardSession({
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
