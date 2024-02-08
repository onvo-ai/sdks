import OnvoBase from "../base";

export class OnvoDatasource extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  getData() {
    return this.fetchBase("/api/datasources/" + this.#id + "/data");
  }
  fetchColumnDescriptions() {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/populate-columns",
      "POST"
    );
  }
}
