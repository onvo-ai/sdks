import OnvoBase from "../base";
export class OnvoDatasource extends OnvoBase {
    #id;
    constructor(id, apiKey, options) {
        super(apiKey, options);
        this.#id = id;
    }
    getData() {
        return this.fetchBase("/api/datasources/" + this.#id + "/data");
    }
    fetchColumnDescriptions() {
        return this.fetchBase("/api/datasources/" + this.#id + "/populate-columns", "POST");
    }
}
