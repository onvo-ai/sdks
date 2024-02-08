import axios from "axios";
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
    accounts;
    teams;
    embed_users;
    datasources;
    automations;
    dashboards;
    dashboard;
    embed_user;
    datasource;
    // Base fetch method
    async fetchBase(url, method, body) {
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
        }
        catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            else if (error.request) {
                throw new Error("No response received from the server");
            }
            else {
                throw new Error("Error in making the request: " + error.message);
            }
        }
    }
    constructor(endpoint, apiKey) {
        super(endpoint, apiKey);
        this.accounts = new OnvoAccounts(endpoint, apiKey);
        this.teams = new OnvoTeams(endpoint, apiKey);
        this.embed_users = new OnvoEmbedUsers(endpoint, apiKey);
        this.datasources = new OnvoDatasources(endpoint, apiKey);
        this.automations = new OnvoAutomations(endpoint, apiKey);
        this.dashboards = new OnvoDashboards(endpoint, apiKey);
        this.dashboard = (dashboardId) => {
            return new OnvoDashboard(endpoint, apiKey, dashboardId);
        };
        this.embed_user = (embedUserId) => {
            return new OnvoEmbedUser(endpoint, apiKey, embedUserId);
        };
        this.datasource = (datasourceId) => {
            return new OnvoDatasource(endpoint, apiKey, datasourceId);
        };
    }
}
export default Onvo;
