import OnvoBase from "../base";
import { Session } from "../types";

export class OnvoSessions extends OnvoBase {
  // Dashboard Session endpoints
  /**
   * Lists all sessions for a given dashboard
   * @param filters - Object containing the parent_dashboard field
   * @returns Promise of an array of Session objects
   */
  list(filters: {
    parent_dashboard?: string;
    embed_user?: string;
  }): Promise<Session[]> {
    if (filters.embed_user) {
      return this.fetchBase(
        "/api/sessions?embed_user=" + filters.embed_user
      ) as Promise<Session[]>;
    } else {
      return this.fetchBase(
        "/api/sessions?parent_dashboard=" + filters.parent_dashboard
      ) as Promise<Session[]>;
    }
  }

  /**
   * Gets a specific session by its dashboard id
   * @param filters - Object containing the dashboard field
   * @returns Promise of a Session object
   */
  get(filters: { dashboard: string }): Promise<Session> {
    return this.fetchBase(
      "/api/sessions?dashboard=" + filters.dashboard
    ) as Promise<Session>;
  }

  /**
   * Revokes a session by its dashboard id
   * @param filters - Object containing the dashboard field
   * @returns Promise of an object with a success field
   */
  revoke(filters: { dashboard: string }): Promise<{ success: true }> {
    return this.fetchBase(
      "/api/sessions?dashboard=" + filters.dashboard,
      "DELETE"
    ) as Promise<{ success: true }>;
  }

  /**
   * Revokes all sessions for a given dashboard
   * @param filters - Object containing the parent_dashboard field
   * @returns Promise of an object with a success field
   */
  revokeAll(filters: { parent_dashboard: string }): Promise<{ success: true }> {
    return this.fetchBase(
      "/api/sessions?parent_dashboard=" + filters.parent_dashboard,
      "DELETE"
    ) as Promise<{ success: true }>;
  }

  /**
   * Creates or updates a session for a given embed_user
   * @param filters - Object containing the embed_user, parent_dashboard and parameters fields
   * @returns Promise of a Session object with additional url and token fields
   */
  async upsert({
    embed_user,
    parent_dashboard,
    parameters,
  }: {
    embed_user: string;
    parent_dashboard: string;
    parameters?: { [key: string]: any };
  }): Promise<Session & { url: string; token: string }> {
    let data: any = await this.fetchBase("/api/sessions", "POST", {
      user: embed_user,
      parameters: parameters,
      dashboard: parent_dashboard,
    });

    return data as Promise<Session & { url: string; token: string }>;
  }
}
