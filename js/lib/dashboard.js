import { OnvoDashboardWidgets } from "./dashboard_widgets";
import { OnvoDashboardQuestions } from "./dashboard_questions";
import { OnvoDashboardSessions } from "./dashboard_sessions";
import { OnvoDashboardDatasources } from "./dashboard_datasources";
export class OnvoDashboard {
    apiKey;
    endpoint;
    widgets;
    questions;
    sessions;
    datasources;
    fetchBase;
    constructor(endpoint, apiKey, fetchBase, id) {
        this.apiKey = apiKey;
        this.endpoint = endpoint;
        this.fetchBase = fetchBase;
        this.widgets = new OnvoDashboardWidgets(endpoint, apiKey, this.fetchBase, id);
        this.questions = new OnvoDashboardQuestions(endpoint, apiKey, this.fetchBase, id);
        this.sessions = new OnvoDashboardSessions(endpoint, apiKey, this.fetchBase, id);
        this.datasources = new OnvoDashboardDatasources(endpoint, apiKey, this.fetchBase, id);
    }
}
