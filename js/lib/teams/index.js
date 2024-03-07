import OnvoBase from "../base.js";
// Team endpoints
export class OnvoTeams extends OnvoBase {
    list() {
        return this.fetchBase("/api/teams");
    }
    get(id) {
        return this.fetchBase("/api/teams/" + id);
    }
    update(id, body) {
        return this.fetchBase("/api/teams/" + id, "POST", body);
    }
}
