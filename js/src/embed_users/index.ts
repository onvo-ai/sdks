import OnvoBase from "../base";
import { EmbedUser } from "../types";

// Embed user endpoints
export class OnvoEmbedUsers extends OnvoBase {
  list() {
    return this.fetchBase("/api/embed-users") as Promise<EmbedUser[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/embed-users/" + id) as Promise<EmbedUser>;
  }
  delete(id: string) {
    return this.fetchBase("/api/embed-users/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  upsert(
    userId: string,
    userData: {
      name: string;
      email: string;
      metadata: { [key: string]: any };
    }
  ) {
    return this.fetchBase("/api/embed-users", "POST", {
      id: userId,
      name: userData.name,
      email: userData.email,
      metadata: userData.metadata,
    }) as Promise<EmbedUser>;
  }
}
