import OnvoBase from "../base.js";
// Datasource user endpoints
export class OnvoDatasources extends OnvoBase {
    list() {
        return this.fetchBase("/api/datasources");
    }
    get(id) {
        return this.fetchBase("/api/datasources/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/datasources/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/datasources/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/datasources", "PUT", body);
    }
}
