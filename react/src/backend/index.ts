class Backend {
  baseUrl: string;
  token: string;
  id: string;

  constructor(obj: { baseUrl: string; token: string; id: string }) {
    this.baseUrl = obj.baseUrl;
    this.token = obj.token;
    this.id = obj.id;
  }

  async getDashboard() {
    let response = await fetch(this.baseUrl + "/api/dashboards/" + this.id, {
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

  async getDashboardWidgets() {
    let response = await fetch(
      this.baseUrl + "/api/dashboards/" + this.id + "/widgets",
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
