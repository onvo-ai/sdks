import { OnvoDashboardDatasources } from "./dashboard_datasources.js";
import OnvoBase from "../base.js";
export declare class OnvoDashboard extends OnvoBase {
    #private;
    datasources: OnvoDashboardDatasources;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    updateWidgetCache(): Promise<{
        assumptions: string[];
        cache: string | null;
        code: string;
        created_at: string;
        dashboard: string;
        h: number | null;
        id: string;
        messages: import("../types/index.js").Json;
        settings: import("../types/index.js").Json;
        team: string;
        title: string;
        w: number | null;
        x: number | null;
        y: number | null;
    }[]>;
    getWidgetSuggestions(): Promise<string[]>;
}
