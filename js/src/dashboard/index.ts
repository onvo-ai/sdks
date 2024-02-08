import { OnvoDashboardWidgets } from "./dashboard_widgets";
import { OnvoDashboardQuestions } from "./dashboard_questions";
import { OnvoDashboardSessions } from "./dashboard_sessions";
import { OnvoDashboardDatasources } from "./dashboard_datasources";
import OnvoBase from "../base";

export class OnvoDashboard extends OnvoBase {
  widgets: OnvoDashboardWidgets;
  questions: OnvoDashboardQuestions;
  sessions: OnvoDashboardSessions;
  datasources: OnvoDashboardDatasources;

  constructor(endpoint: string, apiKey: string, id: string) {
    super(endpoint, apiKey);

    this.widgets = new OnvoDashboardWidgets(endpoint, apiKey, id);
    this.questions = new OnvoDashboardQuestions(endpoint, apiKey, id);
    this.sessions = new OnvoDashboardSessions(endpoint, apiKey, id);
    this.datasources = new OnvoDashboardDatasources(endpoint, apiKey, id);
  }
}
