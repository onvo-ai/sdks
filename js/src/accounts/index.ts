import OnvoBase from "../base";
import { Account } from "../types";

// Account endpoints
export class OnvoAccounts extends OnvoBase {
  list() {
    return this.fetchBase("/api/accounts") as Promise<Account[]>;
  }
  get(id: string) {
    return this.fetchBase("/api/accounts/" + id) as Promise<Account>;
  }
}
