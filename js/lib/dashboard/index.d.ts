import { OnvoDashboardWidgets } from "./dashboard_widgets";
import { OnvoDashboardQuestions } from "./dashboard_questions";
import { OnvoDashboardSessions } from "./dashboard_sessions";
import { OnvoDashboardDatasources } from "./dashboard_datasources";
import OnvoBase from "../base";
export declare class OnvoDashboard extends OnvoBase {
    widgets: OnvoDashboardWidgets;
    questions: OnvoDashboardQuestions;
    sessions: OnvoDashboardSessions;
    datasources: OnvoDashboardDatasources;
    constructor(endpoint: string, apiKey: string, id: string);
}
