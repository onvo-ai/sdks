import OnvoBase from "../base";
import { Session } from "../types";

export class OnvoSessions extends OnvoBase {
  // Dashboard Session endpoints
  list(filters: { parent_dashboard: string }) {
    return this.fetchBase(
      "/api/sessions?parent_dashboard=" + filters.parent_dashboard
    ) as Promise<Session[]>;
  }

  get(filters: { dashboard: string }) {
    return this.fetchBase(
      "/api/sessions?dashboard=" + filters.dashboard
    ) as Promise<Session>;
  }

  revoke(filters: { dashboard: string }) {
    return this.fetchBase(
      "/api/sessions?dashboard=" + filters.dashboard,
      "DELETE"
    ) as Promise<{ success: true }>;
  }

  revokeAll(filters: { parent_dashboard: string }) {
    return this.fetchBase(
      "/api/sessions?parent_dashboard=" + filters.parent_dashboard,
      "DELETE"
    ) as Promise<{ success: true }>;
  }

  async upsert({
    embed_user,
    parent_dashboard,
    parameters,
  }: {
    embed_user: string;
    parent_dashboard: string;
    parameters?: { [key: string]: any };
  }) {
    let data: any = await this.fetchBase("/api/sessions", "POST", {
      user: embed_user,
      parameters: parameters,
      dashboard: parent_dashboard,
    });

    return data as Promise<Session & { url: string; token: string }>;
  }
}
