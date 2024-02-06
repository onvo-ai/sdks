import { Method } from "axios";

export class OnvoDatasources {
  apiKey: string;
  endpoint: string;

  fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;

  constructor(
    endpoint: string,
    apiKey: string,
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>
  ) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.fetchBase = fetchBase;
  }

  // Datasource user endpoints
  list() {
    return this.fetchBase("/api/datasources");
  }
  get(id: string) {
    return this.fetchBase("/api/datasources/" + id);
  }
  getData(id: string) {
    return this.fetchBase("/api/datasources/" + id + "/data");
  }
  fetchColumnDescriptions(id: string) {
    return this.fetchBase(
      "/api/datasources/" + id + "/populate-columns",
      "POST"
    );
  }
  delete(id: string) {
    return this.fetchBase("/api/datasources/" + id, "DELETE");
  }
  update(id: string, body: any) {
    return this.fetchBase("/api/datasources/" + id, "POST", body);
  }
  create(body: any) {
    return this.fetchBase("/api/datasources", "PUT", body);
  }
}
