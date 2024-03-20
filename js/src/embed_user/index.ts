import OnvoBase from "../base";

export class OnvoEmbedUser extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  getAccessToken() {
    return this.fetchBase(
      "/api/embed-users/" + this.#id + "/token"
    ) as Promise<{ user: string; token: string }>;
  }
}
