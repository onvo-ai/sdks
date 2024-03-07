import OnvoBase from "../base.js";
// Question endpoints
export class OnvoQuestions extends OnvoBase {
    list(filters) {
        return this.fetchBase("/api/questions?dashboard=" + filters.dashboard);
    }
    create(payload) {
        return this.fetchBase("/api/dashboards/" +
            payload.dashboard +
            "/questions?query=" +
            payload.query, "PUT");
    }
    delete(id) {
        return this.fetchBase("/api/questions/" + id, "DELETE");
    }
}
