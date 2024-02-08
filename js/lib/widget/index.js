import OnvoBase from "../base";
export class OnvoWidget extends OnvoBase {
    #id;
    constructor(id, apiKey, options) {
        super(apiKey, options);
        this.#id = id;
    }
    getImage() {
        return this.fetchBase("/api/widgets/" + this.#id + "/image");
    }
}
