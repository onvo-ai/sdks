import axios, { Method } from "axios";
import { OnvoAccounts } from "./accounts";
import { OnvoTeams } from "./teams";
import { OnvoEmbedUsers } from "./embed_users";
import { OnvoDatasources } from "./datasources";
import { OnvoAutomations } from "./automations";
import { OnvoDashboards } from "./dashboards";
import { OnvoDashboard } from "./dashboard";
import OnvoBase from "./base";
import { OnvoEmbedUser } from "./embed_user";
import { OnvoDatasource } from "./datasource";

export class Onvo extends OnvoBase {
  accounts: OnvoAccounts;
  teams: OnvoTeams;
  embed_users: OnvoEmbedUsers;
  datasources: OnvoDatasources;
  automations: OnvoAutomations;
  dashboards: OnvoDashboards;

  dashboard: (dashboardId: string) => OnvoDashboard;
  embed_user: (embedUserId: string) => OnvoEmbedUser;
  datasource: (datasourceId: string) => OnvoDatasource;

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
    super(endpoint, apiKey);

    this.accounts = new OnvoAccounts(endpoint, apiKey);
    this.teams = new OnvoTeams(endpoint, apiKey);
    this.embed_users = new OnvoEmbedUsers(endpoint, apiKey);
    this.datasources = new OnvoDatasources(endpoint, apiKey);
    this.automations = new OnvoAutomations(endpoint, apiKey);
    this.dashboards = new OnvoDashboards(endpoint, apiKey);

    this.dashboard = (dashboardId: string) => {
      return new OnvoDashboard(endpoint, apiKey, dashboardId);
    };

    this.embed_user = (embedUserId: string) => {
      return new OnvoEmbedUser(endpoint, apiKey, embedUserId);
    };
    this.datasource = (datasourceId: string) => {
      return new OnvoDatasource(endpoint, apiKey, datasourceId);
    };
  }
}

export default Onvo;
