import OnvoBase from "./base";

// Dashboard endpoints
export class OnvoDashboards extends OnvoBase {
  list() {
    return this.fetchBase("/api/dashboards");
  }
  get(id: string) {
    return this.fetchBase("/api/dashboards/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/dashboards/" + id, "DELETE");
  }
  update(id: string, body: any) {
    return this.fetchBase("/api/dashboards/" + id, "POST", body);
  }
  create(body: any) {
    return this.fetchBase("/api/dashboards", "PUT", body);
  }
}
