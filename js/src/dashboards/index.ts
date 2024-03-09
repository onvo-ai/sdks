import OnvoBase from "../base";
import { Dashboard } from "../types";

// Dashboard endpoints
export class OnvoDashboards extends OnvoBase {
  list() {
    return this.fetchBase("/api/dashboards") as Promise<Dashboard[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/dashboards/" + id) as Promise<Dashboard>;
  }
  delete(id: string) {
    return this.fetchBase("/api/dashboards/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  update(id: string, body: Partial<Dashboard>) {
    return this.fetchBase(
      "/api/dashboards/" + id,
      "POST",
      body
    ) as Promise<Dashboard>;
  }
  create(body: Omit<Dashboard, "id">) {
    return this.fetchBase("/api/dashboards", "PUT", body) as Promise<Dashboard>;
  }
}
