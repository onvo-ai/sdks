import OnvoBase from "../base";

export class OnvoDatasource extends OnvoBase {
  id: string;

  constructor(endpoint: string, apiKey: string, id: string) {
    super(endpoint, apiKey);
    this.id = id;
  }

  getData() {
    return this.fetchBase("/api/datasources/" + this.id + "/data");
  }
  fetchColumnDescriptions() {
    return this.fetchBase(
      "/api/datasources/" + this.id + "/populate-columns",
      "POST"
    );
  }
}
