import axios, { Method } from "axios";
import { OnvoAccounts } from "./accounts";
import { OnvoTeams } from "./teams";
import { OnvoEmbedUsers } from "./embed_users";
import { OnvoDatasources } from "./datasources";
import { OnvoAutomations } from "./automations";
import { OnvoDashboards } from "./dashboards";
import { OnvoDashboard } from "./dashboard";

export default class Onvo {
  apiKey: string;
  endpoint: string;

  accounts: OnvoAccounts;
  teams: OnvoTeams;
  embed_users: OnvoEmbedUsers;
  datasources: OnvoDatasources;
  automations: OnvoAutomations;
  dashboards: OnvoDashboards;

  dashboard: (dashboardId: string) => OnvoDashboard;

  // Base fetch method
  async fetchBase(url: string, method?: Method, body?: any) {
    try {
      const response = await axios({
        method: method || "GET",
        url: this.endpoint + url,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        data: body,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("Error in making the request: " + error.message);
      }
    }
  }

  constructor(endpoint: string, apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;

    this.accounts = new OnvoAccounts(endpoint, apiKey, this.fetchBase);
    this.teams = new OnvoTeams(endpoint, apiKey, this.fetchBase);
    this.embed_users = new OnvoEmbedUsers(endpoint, apiKey, this.fetchBase);
    this.datasources = new OnvoDatasources(endpoint, apiKey, this.fetchBase);
    this.automations = new OnvoAutomations(endpoint, apiKey, this.fetchBase);
    this.dashboards = new OnvoDashboards(endpoint, apiKey, this.fetchBase);

    this.dashboard = (dashboardId: string) => {
      return new OnvoDashboard(endpoint, apiKey, this.fetchBase, dashboardId);
    };
  }
}
