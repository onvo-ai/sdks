import { Method } from "axios";

export class OnvoTeams {
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

  // Team endpoints
  list() {
    return this.fetchBase("/api/teams");
  }
  get(id: string) {
    return this.fetchBase("/api/teams/" + id);
  }
}
