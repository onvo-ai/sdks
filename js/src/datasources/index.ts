import OnvoBase from "../base";
import { DataSource } from "../types";

// Datasource user endpoints
export class OnvoDatasources extends OnvoBase {
  list() {
    return this.fetchBase("/api/datasources") as Promise<DataSource[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/datasources/" + id) as Promise<DataSource>;
  }
  delete(id: string) {
    return this.fetchBase("/api/datasources/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  update(id: string, body: Partial<DataSource>) {
    return this.fetchBase(
      "/api/datasources/" + id,
      "POST",
      body
    ) as Promise<DataSource>;
  }
  create(body: Omit<DataSource, "id">) {
    return this.fetchBase(
      "/api/datasources",
      "PUT",
      body
    ) as Promise<DataSource>;
  }
}
