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

  delete(id: string) {
    return this.fetchBase(
      "/api/sessions?dashboard=" + id,
      "DELETE"
    ) as Promise<{ success: true }>;
  }

  revokeAll(filters: { dashboard: string }) {
    return this.fetchBase(
      "/api/sessions?parent_dashboard=" + filters.dashboard,
      "DELETE"
    ) as Promise<{ success: true }>;
  }

  async upsert({
    user,
    dashboard,
    parameters,
  }: {
    user: string;
    dashboard: string;
    parameters?: { [key: string]: any };
  }) {
    let data: any = await this.fetchBase("/api/sessions", "POST", {
      user: user,
      parameters: parameters,
      dashboard: dashboard,
    });

    return { ...data, url: this.endpoint + data.url } as Promise<
      Session & { url: string }
    >;
  }
}
