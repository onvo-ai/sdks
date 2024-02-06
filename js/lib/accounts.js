export class OnvoAccounts {
    apiKey;
    endpoint;
    async fetchBase(url, method, body) { }
    constructor(endpoint, apiKey, fetchBase) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
    }
    // Account endpoints
    list() {
        return this.fetchBase("/api/accounts");
    }
    get(id) {
        return this.fetchBase("/api/accounts/" + id);
    }
}
