import { Method } from "axios";

export class OnvoEmbedUsers {
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

  // Embed user endpoints
  list() {
    return this.fetchBase("/api/embed-users");
  }
  get(id: string) {
    return this.fetchBase("/api/embed-users/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/embed-users/" + id, "DELETE");
  }
  upsert(
    userId: string,
    userData: {
      name: string;
      email: string;
      metadata: { [key: string]: any };
    }
  ) {
    return this.fetchBase("/api/embed-users", "POST", {
      id: userId,
      name: userData.name,
      email: userData.email,
      metadata: userData.metadata,
    });
  }
  getAccessToken(id: string) {
    return this.fetchBase("/api/embed-users/" + id + "/token");
  }
}
