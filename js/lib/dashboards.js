import OnvoBase from "./base";
// Dashboard endpoints
export class OnvoDashboards extends OnvoBase {
    list() {
        return this.fetchBase("/api/dashboards");
    }
    get(id) {
        return this.fetchBase("/api/dashboards/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/dashboards/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/dashboards/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/dashboards", "PUT", body);
    }
}
