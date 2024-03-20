import OnvoBase from "../base";
import { Team } from "../types";

// Team endpoints
export class OnvoTeams extends OnvoBase {
  list() {
    return this.fetchBase("/api/teams") as Promise<Team[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/teams/" + id) as Promise<Team>;
  }
  update(id: string, body: Partial<Team>) {
    return this.fetchBase("/api/teams/" + id, "POST", body) as Promise<Team>;
  }
}
