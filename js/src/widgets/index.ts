import OnvoBase from "../base";

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
  update(id: string, body: any) {
    return this.fetchBase("/api/widgets/" + id, "POST", body);
  }
  create({ query, dashboard }: { query: string; dashboard: string }) {
    return this.fetchBase("/api/widgets?query=" + query, "PUT", {
      dashboard: dashboard,
    });
  }
}
