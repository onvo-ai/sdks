import OnvoBase from "../base";
import { Automation } from "../types";

// Automation endpoints
export class OnvoAutomations extends OnvoBase {
  list() {
    return this.fetchBase("/api/automations") as Promise<Automation[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/automations/" + id) as Promise<Automation>;
  }
  delete(id: string) {
    return this.fetchBase("/api/automations/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  update(id: string, body: Partial<Automation>) {
    return this.fetchBase(
      "/api/automations/" + id,
      "POST",
      body
    ) as Promise<Automation>;
  }
  create(body: Partial<Automation>) {
    return this.fetchBase(
      "/api/automations",
      "PUT",
      body
    ) as Promise<Automation>;
  }
}
