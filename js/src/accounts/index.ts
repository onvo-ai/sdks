import OnvoBase from "../base";
import { Account } from "../types";

/**
 * Endpoints for managing accounts.
 */
export class OnvoAccounts extends OnvoBase {
  /**
   * Fetches a list of accounts.
   *
   * @return {Promise<Account[]>} A promise that resolves to an array of Account objects.
   */
  list(): Promise<Account[]> {
    return this.fetchBase("/api/accounts") as Promise<Account[]>;
  }
  /**
   * Fetches a specific account by ID.
   *
   * @param {string} id - The ID of the account to fetch.
   * @return {Promise<Account>} A promise that resolves to an Account object.
   */
  get(id: string): Promise<Account> {
    return this.fetchBase("/api/accounts/" + id) as Promise<Account>;
  }
}
