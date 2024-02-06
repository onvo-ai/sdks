import { Method } from "axios";
export declare class OnvoDashboardDatasources {
    apiKey: string;
    endpoint: string;
    dashboardId: string;
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => Promise<any>, dashboardId: string);
    list(): Promise<any>;
    unlink(datasourceId: string): Promise<any>;
    link(datasourceId: string): Promise<any>;
}
