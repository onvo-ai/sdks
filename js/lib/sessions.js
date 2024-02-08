import OnvoBase from "./base";
export class OnvoSessions extends OnvoBase {
    // Dashboard Session endpoints
    list(filters) {
        return this.fetchBase("/api/sessions?dashboard=" + filters.dashboard);
    }
    delete(id) {
        return this.fetchBase("/api/sessions/" + id, "DELETE");
    }
    revokeAll(filters) {
        return this.fetchBase("/api/sessions?dashboard=" + filters.dashboard, "DELETE");
    }
    async upsert({ user, dashboard, parameters, }) {
        let data = await this.fetchBase("/api/sessions", "POST", {
            user: user,
            parameters: parameters,
            dashboard: dashboard,
        });
        return { ...data, url: this.endpoint + data.url };
    }
}
