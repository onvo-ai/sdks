import { OnvoDashboardDatasources } from "./dashboard_datasources.js";
import OnvoBase from "../base.js";
export declare class OnvoDashboard extends OnvoBase {
    #private;
    datasources: OnvoDashboardDatasources;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    updateWidgetCache(): Promise<any>;
    getWidgetSuggestions(): Promise<any>;
}
