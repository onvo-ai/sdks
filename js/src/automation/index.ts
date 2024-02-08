import OnvoBase from "../base";

export class OnvoAutomation extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  getRuns() {
    return this.fetchBase("/api/automations/" + this.#id + "/runs");
  }
}
