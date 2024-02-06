import axios from "axios";
import { OnvoAccounts } from "./accounts";
import { OnvoTeams } from "./teams";
import { OnvoEmbedUsers } from "./embed_users";
import { OnvoDatasources } from "./datasources";
import { OnvoAutomations } from "./automations";
import { OnvoDashboards } from "./dashboards";
import { OnvoDashboard } from "./dashboard";
export default class Onvo {
    apiKey;
    endpoint;
    accounts;
    teams;
    embed_users;
    datasources;
    automations;
    dashboards;
    dashboard;
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
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.accounts = new OnvoAccounts(endpoint, apiKey, this.fetchBase);
        this.teams = new OnvoTeams(endpoint, apiKey, this.fetchBase);
        this.embed_users = new OnvoEmbedUsers(endpoint, apiKey, this.fetchBase);
        this.datasources = new OnvoDatasources(endpoint, apiKey, this.fetchBase);
        this.automations = new OnvoAutomations(endpoint, apiKey, this.fetchBase);
        this.dashboards = new OnvoDashboards(endpoint, apiKey, this.fetchBase);
        this.dashboard = (dashboardId) => {
            return new OnvoDashboard(endpoint, apiKey, this.fetchBase, dashboardId);
        };
    }
}
