import { Method } from "axios";

export class OnvoAccounts {
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

  // Account endpoints
  list() {
    return this.fetchBase("/api/accounts");
  }
  get(id: string) {
    return this.fetchBase("/api/accounts/" + id);
  }
}
