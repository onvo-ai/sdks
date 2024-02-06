import { Method } from "axios";

export class OnvoAutomations {
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

  // Automation endpoints
  list() {
    return this.fetchBase("/api/automations");
  }
  get(id: string) {
    return this.fetchBase("/api/automations/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/automations/" + id, "DELETE");
  }
  update(id: string, body: any) {
    return this.fetchBase("/api/automations/" + id, "POST", body);
  }
  create(body: any) {
    return this.fetchBase("/api/automations", "PUT", body);
  }
}
