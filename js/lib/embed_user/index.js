import OnvoBase from "../base.js";
export class OnvoEmbedUser extends OnvoBase {
    #id;
    constructor(id, apiKey, options) {
        super(apiKey, options);
        this.#id = id;
    }
    getAccessToken() {
        return this.fetchBase("/api/embed-users/" + this.#id + "/token");
    }
}
