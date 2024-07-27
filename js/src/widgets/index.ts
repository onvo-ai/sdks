import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoWidgets extends OnvoBase {
  // Dashboard Widget endpoints
  /**
   * Retrieves a list of widgets for a given dashboard.
   *
   * @param {Object} filters - Filters for the widgets.
   * @param {string} filters.dashboard - The ID of the dashboard to retrieve widgets for.
   * @return {Promise<Widget[]>} A promise that resolves to an array of widgets.
   */
  list(filters: {
    dashboard: string;
    use_in_library?: boolean;
  }): Promise<Widget[]> {
    return this.fetchBase(
      `/api/widgets?dashboard=${filters.dashboard}&use_in_library=${filters.use_in_library}`
    ) as Promise<Widget[]>;
  }
  /**
   * Retrieves a specific widget by its ID.
   *
   * @param {string} id - The ID of the widget to retrieve.
   * @return {Promise<Widget>} A promise that resolves to the widget.
   */
  get(id: string): Promise<Widget> {
    return this.fetchBase("/api/widgets/" + id) as Promise<Widget>;
  }
  /**
   * Deletes a widget by its ID.
   *
   * @param {string} id - The ID of the widget to delete.
   * @return {Promise<{success: boolean}>} A promise that resolves to an object indicating success.
   */
  delete(id: string): Promise<{ success: boolean }> {
    return this.fetchBase("/api/widgets/" + id, "DELETE") as Promise<{
      success: boolean;
    }>;
  }
  /**
   * Updates a widget by its ID.
   *
   * @param {string} id - The ID of the widget to update.
   * @param {Partial<Widget>} body - The updated widget data.
   * @return {Promise<Widget>} A promise that resolves to the updated widget.
   */
  update(id: string, body: Partial<Widget>): Promise<Widget> {
    return this.fetchBase(
      "/api/widgets/" + id,
      "POST",
      body
    ) as Promise<Widget>;
  }
  /**
   * Creates a new widget.
   *
   * @param {Omit<Widget, "id" | "created_at">} body - The widget data to create.
   * @return {Promise<Widget>} A promise that resolves to the created widget.
   */
  create(body: Omit<Widget, "id" | "created_at">): Promise<Widget> {
    return this.fetchBase("/api/widgets", "PUT", body) as Promise<Widget>;
  }
}
