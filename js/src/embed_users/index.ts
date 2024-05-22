import OnvoBase from "../base";
import { EmbedUser } from "../types";

// Embed user endpoints
export class OnvoEmbedUsers extends OnvoBase {
  /**
   * Retrieves a list of embed users.
   * @returns {Promise<EmbedUser[]>} A promise that resolves to an array of embed users.
   */
  list(): Promise<EmbedUser[]> {
    return this.fetchBase("/api/embed-users") as Promise<EmbedUser[]>;
  }
  /**
   * Retrieves an embed user by ID.
   * @param {string} id - The ID of the embed user.
   * @returns {Promise<EmbedUser>} A promise that resolves to the embed user.
   */
  get(id: string): Promise<EmbedUser> {
    return this.fetchBase("/api/embed-users/" + id) as Promise<EmbedUser>;
  }
  /**
   * Deletes an embed user by ID.
   * @param {string} id - The ID of the embed user.
   * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating success.
   */
  delete(id: string): Promise<{ success: boolean }> {
    return this.fetchBase("/api/embed-users/" + id, "DELETE") as Promise<{
      success: boolean;
    }>;
  }
  /**
   * Creates or updates an embed user.
   * @param {string} userId - The ID of the embed user.
   * @param {Object} userData - The data for the embed user.
   * @param {string} userData.name - The name of the embed user.
   * @param {string} userData.email - The email of the embed user.
   * @param {Object} [userData.metadata] - Additional metadata for the embed user.
   * @returns {Promise<EmbedUser>} A promise that resolves to the created or updated embed user.
   */
  upsert(
    userId: string,
    userData: {
      name: string;
      email: string;
      metadata?: { [key: string]: any };
    }
  ): Promise<EmbedUser> {
    return this.fetchBase("/api/embed-users", "POST", {
      id: userId,
      name: userData.name,
      email: userData.email,
      metadata: userData.metadata,
    }) as Promise<EmbedUser>;
  }
}
