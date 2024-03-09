import OnvoBase from "../base.js";
export declare class OnvoDashboardDatasources extends OnvoBase {
    #private;
    constructor(dashboardId: string, apiKey: string, options?: {
        endpoint: string;
    });
    list(): Promise<{
        dashboard: string;
        datasource: string;
        team: string;
    }[]>;
    unlink(datasourceId: string): Promise<{
        success: true;
    }>;
    link(datasourceId: string): Promise<{
        success: true;
    }>;
}
