import OnvoBase from "../base";

export class OnvoWidget extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  getImage() {
    return this.fetchBase("/api/widgets/" + this.#id + "/image");
  }
}
