import OnvoBase from "./base.js";
import { OnvoAccounts } from "./accounts/index.js";
import { OnvoTeams } from "./teams/index.js";
import { OnvoEmbedUsers } from "./embed_users/index.js";
import { OnvoDatasources } from "./datasources/index.js";
import { OnvoAutomations } from "./automations/index.js";
import { OnvoDashboards } from "./dashboards/index.js";
import { OnvoDashboard } from "./dashboard/index.js";
import { OnvoEmbedUser } from "./embed_user/index.js";
import { OnvoDatasource } from "./datasource/index.js";
import { OnvoQuestions } from "./questions/index.js";
import { OnvoAutomation } from "./automation/index.js";
import { OnvoWidget } from "./widget/index.js";
import { OnvoSessions } from "./sessions/index.js";
import { OnvoWidgets } from "./widgets/index.js";
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
