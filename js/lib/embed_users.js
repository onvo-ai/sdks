export class OnvoEmbedUsers {
    apiKey;
    endpoint;
    fetchBase;
    constructor(endpoint, apiKey, fetchBase) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
    }
    // Embed user endpoints
    list() {
        return this.fetchBase("/api/embed-users");
    }
    get(id) {
        return this.fetchBase("/api/embed-users/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/embed-users/" + id, "DELETE");
    }
    upsert(userId, userData) {
        return this.fetchBase("/api/embed-users", "POST", {
            id: userId,
            name: userData.name,
            email: userData.email,
            metadata: userData.metadata,
        });
    }
    getAccessToken(id) {
        return this.fetchBase("/api/embed-users/" + id + "/token");
    }
}
