import { Method } from "axios";
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
    fetchBase(url: string, method?: Method, body?: any): Promise<any>;
    constructor(endpoint: string, apiKey: string);
}
