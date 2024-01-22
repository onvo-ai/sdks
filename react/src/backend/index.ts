class Backend {
  baseUrl: string;
  token: string;

  constructor(obj: { baseUrl: string; token: string }) {
    this.baseUrl = obj.baseUrl;
    this.token = obj.token;
  }

  async getDashboards() {
    let response = await fetch(this.baseUrl + "/api/dashboards", {
      method: "GET",
      headers: {
        "x-api-key": this.token,
      },
    });
    let data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else return data;
  }

  async getDashboard(id: string) {
    let response = await fetch(this.baseUrl + "/api/dashboards/" + id, {
      method: "GET",
      headers: {
        "x-api-key": this.token,
      },
    });
    let data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else return data;
  }

  async getDashboardWidgets(id: string) {
    let response = await fetch(
      this.baseUrl + "/api/dashboards/" + id + "/widgets",
      {
        method: "GET",
        headers: {
          "x-api-key": this.token,
        },
      }
    );
    let data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else return data;
  }
}
export default Backend;
