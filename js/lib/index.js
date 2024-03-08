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
export * from "./types/index.js";
export class Onvo extends OnvoBase {
    accounts;
    teams;
    embed_users;
    datasources;
    automations;
    dashboards;
    questions;
    widgets;
    sessions;
    automation;
    dashboard;
    embed_user;
    datasource;
    widget;
    constructor(apiKey, options) {
        super(apiKey, options);
        this.accounts = new OnvoAccounts(apiKey, options);
        this.teams = new OnvoTeams(apiKey, options);
        this.embed_users = new OnvoEmbedUsers(apiKey, options);
        this.datasources = new OnvoDatasources(apiKey, options);
        this.automations = new OnvoAutomations(apiKey, options);
        this.dashboards = new OnvoDashboards(apiKey, options);
        this.questions = new OnvoQuestions(apiKey, options);
        this.sessions = new OnvoSessions(apiKey, options);
        this.widgets = new OnvoWidgets(apiKey, options);
        this.dashboard = (dashboardId) => {
            return new OnvoDashboard(dashboardId, apiKey, options);
        };
        this.embed_user = (embedUserId) => {
            return new OnvoEmbedUser(embedUserId, apiKey, options);
        };
        this.datasource = (datasourceId) => {
            return new OnvoDatasource(datasourceId, apiKey, options);
        };
        this.automation = (automationId) => {
            return new OnvoAutomation(automationId, apiKey, options);
        };
        this.widget = (widgetId) => {
            return new OnvoWidget(widgetId, apiKey, options);
        };
    }
}
export default Onvo;
