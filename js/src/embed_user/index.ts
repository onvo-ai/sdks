import OnvoBase from "../base";

export class OnvoEmbedUser extends OnvoBase {
  id: string;

  constructor(endpoint: string, apiKey: string, id: string) {
    super(endpoint, apiKey);
    this.id = id;
  }

  getAccessToken() {
    return this.fetchBase("/api/embed-users/" + this.id + "/token");
  }
}
