import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoWidgets extends OnvoBase {
  // Dashboard Widget endpoints
  list(filters: { dashboard: string }) {
    return this.fetchBase(
      "/api/widgets?dashboard=" + filters.dashboard
    ) as Promise<Widget[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/widgets/" + id) as Promise<Widget>;
  }
  delete(id: string) {
    return this.fetchBase("/api/widgets/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  update(id: string, body: Partial<Widget>) {
    return this.fetchBase(
      "/api/widgets/" + id,
      "POST",
      body
    ) as Promise<Widget>;
  }
  create(body: Omit<Widget, "id" | "created_at">) {
    return this.fetchBase("/api/widgets", "PUT", body) as Promise<Widget>;
  }
}
