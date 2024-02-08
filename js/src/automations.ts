import OnvoBase from "./base";

// Automation endpoints
export class OnvoAutomations extends OnvoBase {
  list() {
    return this.fetchBase("/api/automations");
  }
  get(id: string) {
    return this.fetchBase("/api/automations/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/automations/" + id, "DELETE");
  }
  update(id: string, body: any) {
    return this.fetchBase("/api/automations/" + id, "POST", body);
  }
  create(body: any) {
    return this.fetchBase("/api/automations", "PUT", body);
  }
}
