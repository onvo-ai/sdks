export class OnvoTeams {
    apiKey;
    endpoint;
    fetchBase;
    constructor(endpoint, apiKey, fetchBase) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
    }
    // Team endpoints
    list() {
        return this.fetchBase("/api/teams");
    }
    get(id) {
        return this.fetchBase("/api/teams/" + id);
    }
}
