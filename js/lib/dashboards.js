export class OnvoDashboards {
    apiKey;
    endpoint;
    async fetchBase(url, method, body) { }
    constructor(endpoint, apiKey, fetchBase) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
    }
    // Dashboard endpoints
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
