import OnvoBase from "../base";
import { Automation } from "../types";

// Automation endpoints
export class OnvoAutomations extends OnvoBase {
  /**
   * Fetches all the automations
   * @returns {Promise<Automation[]>} A promise that resolves to an array of Automation objects
   */
  list(): Promise<Automation[]> {
    return this.fetchBase("/api/automations") as Promise<Automation[]>;
  }
  /**
   * Fetches an automation by its ID
   * @param {string} id - The ID of the automation
   * @returns {Promise<Automation>} A promise that resolves to an Automation object
   */
  get(id: string): Promise<Automation> {
    return this.fetchBase("/api/automations/" + id) as Promise<Automation>;
  }
  /**
   * Deletes an automation by its ID
   * @param {string} id - The ID of the automation
   * @returns {Promise<{ success: boolean }>} A promise that resolves to an object with a success field
   */
  delete(id: string): Promise<{ success: boolean }> {
    return this.fetchBase("/api/automations/" + id, "DELETE") as Promise<{
      success: boolean;
    }>;
  }
  /**
   * Updates an automation by its ID
   * @param {string} id - The ID of the automation
   * @param {Partial<Automation>} body - The updated automation data
   * @returns {Promise<Automation>} A promise that resolves to an Automation object
   */
  update(id: string, body: Partial<Automation>): Promise<Automation> {
    return this.fetchBase(
      "/api/automations/" + id,
      "POST",
      body
    ) as Promise<Automation>;
  }
  /**
   * Creates a new automation
   * @param {Partial<Automation>} body - The automation data
   * @returns {Promise<Automation>} A promise that resolves to an Automation object
   */
  create(body: Partial<Automation>): Promise<Automation> {
    return this.fetchBase(
      "/api/automations",
      "PUT",
      body
    ) as Promise<Automation>;
  }
}
