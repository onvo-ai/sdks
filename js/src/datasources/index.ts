import OnvoBase from "../base";
import { DataSource } from "../types";

// Datasource user endpoints
export class OnvoDatasources extends OnvoBase {
  /**
   * Lists all the datasources.
   * @returns {Promise<DataSource[]>} A promise that resolves to an array of datasources.
   */
  list(): Promise<DataSource[]> {
    return this.fetchBase("/api/datasources") as Promise<DataSource[]>;
  }

  /**
   * Gets a datasource by ID.
   * @param {string} id - The ID of the datasource.
   * @returns {Promise<DataSource>} A promise that resolves to the datasource.
   */
  get(id: string): Promise<DataSource> {
    return this.fetchBase("/api/datasources/" + id) as Promise<DataSource>;
  }

  /**
   * Deletes a datasource by ID.
   * @param {string} id - The ID of the datasource.
   * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating the success of the deletion.
   */
  delete(id: string): Promise<{ success: boolean }> {
    return this.fetchBase("/api/datasources/" + id, "DELETE") as Promise<{
      success: boolean;
    }>;
  }

  /**
   * Updates a datasource by ID.
   * @param {string} id - The ID of the datasource.
   * @param {Partial<DataSource>} body - The updated datasource object.
   * @returns {Promise<DataSource>} A promise that resolves to the updated datasource.
   */
  update(id: string, body: Partial<DataSource>): Promise<DataSource> {
    return this.fetchBase(
      "/api/datasources/" + id,
      "POST",
      body
    ) as Promise<DataSource>;
  }

  /**
   * Creates a new datasource.
   * @param {Omit<DataSource, "id" | "created_at" | "created_by" | "last_updated_at" | "last_updated_by" | "sample_data" | "size" | "team">} body - The new datasource object.
   * @returns {Promise<DataSource>} A promise that resolves to the created datasource.
   */
  create(
    body: Omit<
      DataSource,
      | "id"
      | "created_at"
      | "created_by"
      | "last_updated_at"
      | "last_updated_by"
      | "sample_data"
      | "size"
      | "team"
    >
  ): Promise<DataSource> {
    return this.fetchBase(
      "/api/datasources",
      "PUT",
      body
    ) as Promise<DataSource>;
  }
}
