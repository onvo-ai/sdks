export class OnvoDatasources {
    apiKey;
    endpoint;
    fetchBase;
    constructor(endpoint, apiKey, fetchBase) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
    }
    // Datasource user endpoints
    list() {
        return this.fetchBase("/api/datasources");
    }
    get(id) {
        return this.fetchBase("/api/datasources/" + id);
    }
    getData(id) {
        return this.fetchBase("/api/datasources/" + id + "/data");
    }
    fetchColumnDescriptions(id) {
        return this.fetchBase("/api/datasources/" + id + "/populate-columns", "POST");
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
