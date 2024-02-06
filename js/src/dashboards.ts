import { Method } from "axios";

export class OnvoDashboards {
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

  // Dashboard endpoints
  list() {
    return this.fetchBase("/api/dashboards");
  }
  get(id: string) {
    return this.fetchBase("/api/dashboards/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/dashboards/" + id, "DELETE");
  }
  update(id: string, body: any) {
    return this.fetchBase("/api/dashboards/" + id, "POST", body);
  }
  create(body: any) {
    return this.fetchBase("/api/dashboards", "PUT", body);
  }
}
