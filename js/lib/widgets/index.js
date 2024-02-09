import OnvoBase from "../base";
export class OnvoWidgets extends OnvoBase {
    // Dashboard Widget endpoints
    list(filters) {
        return this.fetchBase("/api/widgets?dashboard=" + filters.dashboard);
    }
    get(id) {
        return this.fetchBase("/api/widgets/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/widgets/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/widgets/" + id, "POST", body);
    }
    create({ query, dashboard }) {
        return this.fetchBase("/api/widgets?query=" + query, "PUT", {
            dashboard: dashboard,
        });
    }
}
