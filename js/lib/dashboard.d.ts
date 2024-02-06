import { Method } from "axios";
import { OnvoDashboardWidgets } from "./dashboard_widgets";
import { OnvoDashboardQuestions } from "./dashboard_questions";
import { OnvoDashboardSessions } from "./dashboard_sessions";
import { OnvoDashboardDatasources } from "./dashboard_datasources";
export declare class OnvoDashboard {
    apiKey: string;
    endpoint: string;
    widgets: OnvoDashboardWidgets;
    questions: OnvoDashboardQuestions;
    sessions: OnvoDashboardSessions;
    datasources: OnvoDashboardDatasources;
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => Promise<any>, id: string);
}
