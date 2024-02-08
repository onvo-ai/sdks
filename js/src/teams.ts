import OnvoBase from "./base";

// Team endpoints
export class OnvoTeams extends OnvoBase {
  list() {
    return this.fetchBase("/api/teams");
  }
  get(id: string) {
    return this.fetchBase("/api/teams/" + id);
  }
}
