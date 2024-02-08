import OnvoBase from "../base";
export declare class OnvoDashboardSessions extends OnvoBase {
    dashboardId: string;
    constructor(endpoint: string, apiKey: string, dashboardId: string);
    list(): Promise<any>;
    delete(): Promise<any>;
    upsert({ userId, parameters, }: {
        userId: string;
        parameters?: {
            [key: string]: any;
        };
    }): Promise<any>;
}
