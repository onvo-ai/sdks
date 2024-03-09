import OnvoBase from "../base";
import { DataSource } from "../types";

export class OnvoDatasource extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  getData() {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/data"
    ) as Promise<any>;
  }
  fetchColumnDescriptions() {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/populate-columns",
      "POST"
    ) as Promise<DataSource>;
  }
}
