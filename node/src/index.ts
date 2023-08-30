import fetch from "node-fetch";

export default class Onvo {
  apiKey: string;
  endpoint: string;

  constructor(endpoint: string, apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  identifyUser(
    userId: string,
    userData: {
      name: string;
      email: string;
      metadata: { [key: string]: any };
    }
  ) {
    return fetch(this.endpoint + "/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify({
        id: userId,
        name: userData.name,
        email: userData.email,
        metadata: userData.metadata,
      }),
    }).then((a) => a.json());
  }

  async createSession({
    dashboardId,
    userId,
    parameters,
  }: {
    dashboardId: string;
    userId: string;
    parameters?: { [key: string]: any };
  }) {
    let data: any = await fetch(
      this.endpoint + "/api/dashboards/" + dashboardId + "/sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify({
          user: userId,
          parameters: parameters,
        }),
      }
    ).then((a) => a.json());

    return this.endpoint + data.url;
  }
}
