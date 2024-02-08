import OnvoBase from "./base";
// Embed user endpoints
export class OnvoEmbedUsers extends OnvoBase {
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
}
