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
import { OnvoQuestion } from "./question";
import { OnvoUtils } from "./utils";
import { OnvoTeam } from "./team";
export * from "./types";

export class Onvo extends OnvoBase {
  accounts: OnvoAccounts;
  teams: OnvoTeams;
  embed_users: OnvoEmbedUsers;
  datasources: OnvoDatasources;
  automations: OnvoAutomations;
  dashboards: OnvoDashboards;
  questions: OnvoQuestions;
  widgets: OnvoWidgets;
  sessions: OnvoSessions;
  utils: OnvoUtils;

  automation: (automationId: string) => OnvoAutomation;
  dashboard: (dashboardId: string) => OnvoDashboard;
  embed_user: (embedUserId: string) => OnvoEmbedUser;
  datasource: (datasourceId: string) => OnvoDatasource;
  widget: (widgetId: string) => OnvoWidget;
  question: (questionId: string) => OnvoQuestion;
  team: (teamId: string) => OnvoTeam;

  constructor(apiKey: string, options?: { endpoint: string }) {
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
    this.utils = new OnvoUtils(apiKey, options);

    this.dashboard = (dashboardId: string) => {
      return new OnvoDashboard(dashboardId, apiKey, options);
    };

    this.embed_user = (embedUserId: string) => {
      return new OnvoEmbedUser(embedUserId, apiKey, options);
    };

    this.datasource = (datasourceId: string) => {
      return new OnvoDatasource(datasourceId, apiKey, options);
    };
    this.automation = (automationId: string) => {
      return new OnvoAutomation(automationId, apiKey, options);
    };
    this.widget = (widgetId: string) => {
      return new OnvoWidget(widgetId, apiKey, options);
    };

    this.question = (questionId: string) => {
      return new OnvoQuestion(questionId, apiKey, options);
    };

    this.team = (teamId: string) => {
      return new OnvoTeam(teamId, apiKey, options);
    };
  }
}
export default Onvo;
