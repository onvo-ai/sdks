import OnvoBase from "../base";
export class OnvoEmbedUser extends OnvoBase {
    id;
    constructor(endpoint, apiKey, id) {
        super(endpoint, apiKey);
        this.id = id;
    }
    getAccessToken() {
        return this.fetchBase("/api/embed-users/" + this.id + "/token");
    }
}
