import { Method } from "axios";
export declare class OnvoDashboardSessions {
    apiKey: string;
    endpoint: string;
    dashboardId: string;
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => Promise<any>, dashboardId: string);
    list(): Promise<any>;
    delete(): Promise<any>;
    upsert({ userId, parameters, }: {
        userId: string;
        parameters?: {
            [key: string]: any;
        };
    }): Promise<any>;
}
