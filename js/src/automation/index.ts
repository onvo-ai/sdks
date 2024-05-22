import OnvoBase from "../base";
import { AutomationRun } from "../types";

export class OnvoAutomation extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }
  /**
   * Fetches all the runs of the automation
   * @returns {Promise<AutomationRun[]>} A promise that resolves to an array of AutomationRun objects
   */
  getRuns(): Promise<AutomationRun[]> {
    return this.fetchBase("/api/automations/" + this.#id + "/runs") as Promise<
      AutomationRun[]
    >;
  }
}
