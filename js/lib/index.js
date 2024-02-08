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
export class Onvo extends OnvoBase {
    accounts;
    teams;
    embed_users;
    datasources;
    automations;
    dashboards;
    questions;
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
