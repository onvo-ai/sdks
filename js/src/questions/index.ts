import OnvoBase from "../base";

// Question endpoints
export class OnvoQuestions extends OnvoBase {
  list(filters: { dashboard: string }) {
    return this.fetchBase("/api/questions?dashboard=" + filters.dashboard);
  }
  create(payload: { query: string; dashboard: string }) {
    return this.fetchBase(
      "/api/dashboards/" +
        payload.dashboard +
        "/questions?query=" +
        payload.query,
      "PUT"
    );
  }
  delete(id: string) {
    return this.fetchBase("/api/questions/" + id, "DELETE");
  }
}
