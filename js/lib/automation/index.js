import OnvoBase from "../base.js";
export class OnvoAutomation extends OnvoBase {
    #id;
    constructor(id, apiKey, options) {
        super(apiKey, options);
        this.#id = id;
    }
    getRuns() {
        return this.fetchBase("/api/automations/" + this.#id + "/runs");
    }
}
