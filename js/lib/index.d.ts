import { Method } from "axios";
export default class Onvo {
    apiKey: string;
    endpoint: string;
    constructor(endpoint: string, apiKey: string);
    fetchBase(url: string, method?: Method, body?: any): Promise<any>;
    getAccounts(): Promise<any>;
    getAccountById(id: string): Promise<any>;
    getTeams(): Promise<any>;
    getTeamById(id: string): Promise<any>;
    getEmbedUsers(): Promise<any>;
    getEmbedUserById(id: string): Promise<any>;
    deleteEmbedUserById(id: string): Promise<any>;
    upsertEmbedUser(userId: string, userData: {
        name: string;
        email: string;
        metadata: {
            [key: string]: any;
        };
    }): Promise<any>;
    getEmbedUserAccessToken(id: string): Promise<any>;
    getDatasources(): Promise<any>;
    getDatasourceById(id: string): Promise<any>;
    getDatasourceDataById(id: string): Promise<any>;
    populateDatasourceDataById(id: string): Promise<any>;
    deleteDatasourceById(id: string): Promise<any>;
    updateDatasourceById(id: string, body: any): Promise<any>;
    createDatasource(body: any): Promise<any>;
    getAutomations(): Promise<any>;
    getAutomationById(id: string): Promise<any>;
    deleteAutomationById(id: string): Promise<any>;
    updateAutomationById(id: string, body: any): Promise<any>;
    createAutomation(body: any): Promise<any>;
    getDashboards(): Promise<any>;
    getDashboardById(id: string): Promise<any>;
    deleteDashboardById(id: string): Promise<any>;
    updateDashboardById(id: string, body: any): Promise<any>;
    createDashboard(body: any): Promise<any>;
    getDashboardWidgets(dashboardId: string): Promise<any>;
    getDashboardWidgetById(dashboardId: string, widgetId: String): Promise<any>;
    deleteDashboardWidgetById(dashboardId: string, widgetId: string): Promise<any>;
    updateDashboardWidgetById(dashboardId: string, widgetId: string, body: any): Promise<any>;
    createDashboardWidget(dashboardId: string, body: any): Promise<any>;
    getDashboardQuestionsById(dashboardId: string): Promise<any>;
    askDashboardQuestion(dashboardId: string, query: string): Promise<any>;
    getDashboardSessionsById(dashboardId: string): Promise<any>;
    deleteDashboardSessionsById(dashboardId: string): Promise<any>;
    upsertDashboardSession({ dashboardId, userId, parameters, }: {
        dashboardId: string;
        userId: string;
        parameters?: {
            [key: string]: any;
        };
    }): Promise<any>;
    getDashboardDatasources(dashboardId: string): Promise<any>;
    unlinkDashboardDatasourceById(dashboardId: string, datasourceId: string): Promise<any>;
    linkDashboardDatasource(dashboardId: string, datasourceId: string): Promise<any>;
}
