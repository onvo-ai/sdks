import OnvoBase from "../base";

export class OnvoEmbedUser extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  /**
   * Retrieves an access token for the embed user.
   *
   * @return {Promise<{ user: string; token: string }>} A promise that resolves to an object containing the user ID and the access token.
   */
  getAccessToken(): Promise<{ user: string; token: string }> {
    return this.fetchBase(
      "/api/embed-users/" + this.#id + "/token"
    ) as Promise<{ user: string; token: string }>;
  }
}
