import OnvoBase from "../base";
import { Dashboard, DashboardMeta } from "../types";

// Dashboard endpoints
export class OnvoDashboards extends OnvoBase {
  /**
   * Lists all the dashboards.
   *
   * @return {Promise<(Dashboard & {_meta: DashboardMeta})[]>} A promise that resolves to an array of dashboards.
   */
  list(): Promise<(Dashboard & { _meta: DashboardMeta })[]> {
    return this.fetchBase("/api/dashboards") as Promise<
      (Dashboard & { _meta: DashboardMeta })[]
    >;
  }
  /**
   * Gets a dashboard by ID.
   *
   * @param {string} id - The ID of the dashboard.
   * @return {Promise<Dashboard>} A promise that resolves to the dashboard.
   */
  get(id: string): Promise<Dashboard & { _meta: DashboardMeta }> {
    return this.fetchBase("/api/dashboards/" + id) as Promise<
      Dashboard & { _meta: DashboardMeta }
    >;
  }
  /**
   * Deletes a dashboard by ID.
   *
   * @param {string} id - The ID of the dashboard.
   * @return {Promise<{ success: true }>} A promise that resolves to an object indicating the success of the deletion.
   */
  delete(id: string): Promise<{ success: true }> {
    return this.fetchBase("/api/dashboards/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  /**
   * Updates a dashboard by ID.
   *
   * @param {string} id - The ID of the dashboard.
   * @param {Partial<Dashboard>} body - The updated dashboard data.
   * @return {Promise<Dashboard>} A promise that resolves to the updated dashboard.
   */
  update(id: string, body: Partial<Dashboard>): Promise<Dashboard> {
    return this.fetchBase(
      "/api/dashboards/" + id,
      "PUT",
      body
    ) as Promise<Dashboard>;
  }
  /**
   * Creates a new dashboard.
   *
   * @param {Omit<Dashboard, "id" | "created_at" | "created_by" | "last_updated_at" | "last_updated_by" | "thumbnail" | "team">} body - The dashboard data.
   * @return {Promise<Dashboard>} A promise that resolves to the created dashboard.
   */
  create(
    body: Omit<
      Dashboard,
      | "id"
      | "created_at"
      | "created_by"
      | "last_updated_at"
      | "last_updated_by"
      | "thumbnail"
      | "team"
    >
  ): Promise<Dashboard> {
    return this.fetchBase("/api/dashboards", "POST", body) as Promise<Dashboard>;
  }
}
