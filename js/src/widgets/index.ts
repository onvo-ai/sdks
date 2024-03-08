import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoWidgets extends OnvoBase {
  // Dashboard Widget endpoints
  list(filters: { dashboard: string }) {
    return this.fetchBase("/api/widgets?dashboard=" + filters.dashboard);
  }
  get(id: string) {
    return this.fetchBase("/api/widgets/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/widgets/" + id, "DELETE");
  }
  update(id: string, body: Partial<Widget>) {
    return this.fetchBase("/api/widgets/" + id, "POST", body);
  }
  create(body: Omit<Widget, "id">) {
    return this.fetchBase("/api/widgets", "PUT", body);
  }
}
