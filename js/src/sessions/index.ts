import OnvoBase from "../base";

export class OnvoSessions extends OnvoBase {
  // Dashboard Session endpoints
  list(filters: { dashboard: string }) {
    return this.fetchBase("/api/sessions?dashboard=" + filters.dashboard);
  }

  delete(id: string) {
    return this.fetchBase("/api/sessions/" + id, "DELETE");
  }

  revokeAll(filters: { dashboard: string }) {
    return this.fetchBase(
      "/api/sessions?dashboard=" + filters.dashboard,
      "DELETE"
    );
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

    return { ...data, url: this.endpoint + data.url };
  }
}
