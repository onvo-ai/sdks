import { OnvoDashboardDatasources } from "./dashboard_datasources";
import OnvoBase from "../base";

export class OnvoDashboard extends OnvoBase {
  datasources: OnvoDashboardDatasources;
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
    this.datasources = new OnvoDashboardDatasources(id, apiKey, options);
  }

  updateWidgetCache() {
    return this.fetchBase(
      "/api/dashboards/" + this.#id + "/update-cache",
      "POST"
    );
  }

  getWidgetSuggestions() {
    return this.fetchBase(
      "/api/dashboards/" + this.#id + "/widget-suggestions"
    );
  }
}
