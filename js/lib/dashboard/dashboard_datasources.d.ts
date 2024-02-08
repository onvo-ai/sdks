import OnvoBase from "../base";
export declare class OnvoDashboardDatasources extends OnvoBase {
    #private;
    constructor(dashboardId: string, apiKey: string, options?: {
        endpoint: string;
    });
    list(): Promise<any>;
    unlink(datasourceId: string): Promise<any>;
    link(datasourceId: string): Promise<any>;
}
