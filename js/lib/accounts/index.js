import OnvoBase from "../base";
// Account endpoints
export class OnvoAccounts extends OnvoBase {
    list() {
        return this.fetchBase("/api/accounts");
    }
    get(id) {
        return this.fetchBase("/api/accounts/" + id);
    }
}
