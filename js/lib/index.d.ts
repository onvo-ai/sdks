import OnvoBase from "./base";
import { OnvoAccounts } from "./accounts";
import { OnvoTeams } from "./teams";
import { OnvoEmbedUsers } from "./embed_users";
import { OnvoDatasources } from "./datasources";
import { OnvoAutomations } from "./automations";
import { OnvoDashboards } from "./dashboards";
import { OnvoDashboard } from "./dashboard";
import { OnvoEmbedUser } from "./embed_user";
import { OnvoDatasource } from "./datasource";
import { OnvoQuestions } from "./questions";
import { OnvoAutomation } from "./automation";
import { OnvoWidget } from "./widget";
import { OnvoSessions } from "./sessions";
import { OnvoWidgets } from "./widgets";
export declare class Onvo extends OnvoBase {
    accounts: OnvoAccounts;
    teams: OnvoTeams;
    embed_users: OnvoEmbedUsers;
    datasources: OnvoDatasources;
    automations: OnvoAutomations;
    dashboards: OnvoDashboards;
    questions: OnvoQuestions;
    widgets: OnvoWidgets;
    sessions: OnvoSessions;
    automation: (automationId: string) => OnvoAutomation;
    dashboard: (dashboardId: string) => OnvoDashboard;
    embed_user: (embedUserId: string) => OnvoEmbedUser;
    datasource: (datasourceId: string) => OnvoDatasource;
    widget: (widgetId: string) => OnvoWidget;
    constructor(apiKey: string, options?: {
        endpoint: string;
    });
}
export default Onvo;
