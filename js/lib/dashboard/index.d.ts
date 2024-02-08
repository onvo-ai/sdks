import { OnvoDashboardDatasources } from "./dashboard_datasources";
import OnvoBase from "../base";
export declare class OnvoDashboard extends OnvoBase {
    #private;
    datasources: OnvoDashboardDatasources;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    updateWidgetCache(): Promise<any>;
    getWidgetSuggestions(): Promise<any>;
}
