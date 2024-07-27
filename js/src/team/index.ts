import OnvoBase from "../base";
import { Subscription, SubscriptionPlan } from "../types";

export class OnvoTeam extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  /**
   * Gets the subscription for the datasource
   * @returns {Promise<Subscription & {subscription_plans: SubscriptionPlan}>} A promise that resolves to a subcription.
   */
  getSubscription(): Promise<
    Subscription & { subscription_plans: SubscriptionPlan }
  > {
    return this.fetchBase(
      "/api/teams/" + this.#id + "/subscription"
    ) as Promise<Subscription & { subscription_plans: SubscriptionPlan }>;
  }
}
