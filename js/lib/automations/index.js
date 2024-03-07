import OnvoBase from "../base.js";
// Automation endpoints
export class OnvoAutomations extends OnvoBase {
    list() {
        return this.fetchBase("/api/automations");
    }
    get(id) {
        return this.fetchBase("/api/automations/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/automations/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/automations/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/automations", "PUT", body);
    }
}
