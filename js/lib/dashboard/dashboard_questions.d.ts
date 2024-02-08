import OnvoBase from "../base";
export declare class OnvoDashboardQuestions extends OnvoBase {
    dashboardId: string;
    constructor(endpoint: string, apiKey: string, dashboardId: string);
    list(): Promise<any>;
    create(query: string): Promise<any>;
}
