import { Method } from "axios";
export declare class OnvoDashboardQuestions {
    apiKey: string;
    endpoint: string;
    dashboardId: string;
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => Promise<any>, dashboardId: string);
    list(): Promise<any>;
    create(query: string): Promise<any>;
}
