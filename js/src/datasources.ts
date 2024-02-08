import OnvoBase from "./base";

// Datasource user endpoints
export class OnvoDatasources extends OnvoBase {
  list() {
    return this.fetchBase("/api/datasources");
  }
  get(id: string) {
    return this.fetchBase("/api/datasources/" + id);
  }
  delete(id: string) {
    return this.fetchBase("/api/datasources/" + id, "DELETE");
  }
  update(id: string, body: any) {
    return this.fetchBase("/api/datasources/" + id, "POST", body);
  }
  create(body: any) {
    return this.fetchBase("/api/datasources", "PUT", body);
  }
}
