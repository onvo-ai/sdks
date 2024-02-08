import OnvoBase from "../base";
export declare class OnvoDashboardDatasources extends OnvoBase {
    dashboardId: string;
    constructor(endpoint: string, apiKey: string, dashboardId: string);
    list(): Promise<any>;
    unlink(datasourceId: string): Promise<any>;
    link(datasourceId: string): Promise<any>;
}
