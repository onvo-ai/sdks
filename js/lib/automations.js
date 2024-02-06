export class OnvoAutomations {
    apiKey;
    endpoint;
    fetchBase;
    constructor(endpoint, apiKey, fetchBase) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
    }
    // Automation endpoints
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
