import OnvoBase from "../base";
import { Team } from "../types";

// Team endpoints
export class OnvoTeams extends OnvoBase {
  /**
   * Retrieves a list of all teams.
   * @returns {Promise<Team[]>} A promise that resolves to an array of Team objects.
   */
  list(): Promise<Team[]> {
    return this.fetchBase("/api/teams") as Promise<Team[]>;
  }

  /**
   * Retrieves a specific team by ID.
   * @param {string} id - The ID of the team to retrieve.
   * @returns {Promise<Team>} A promise that resolves to the Team object.
   */
  get(id: string): Promise<Team> {
    return this.fetchBase("/api/teams/" + id) as Promise<Team>;
  }

  /**
   * Updates a specific team.
   * @param {string} id - The ID of the team to update.
   * @param {Partial<Team>} body - The updated team data.
   * @returns {Promise<Team>} A promise that resolves to the updated Team object.
   */
  update(id: string, body: Partial<Team>): Promise<Team> {
    return this.fetchBase("/api/teams/" + id, "POST", body) as Promise<Team>;
  }
}
