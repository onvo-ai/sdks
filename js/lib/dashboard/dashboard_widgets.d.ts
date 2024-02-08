import OnvoBase from "../base";
export declare class OnvoDashboardWidgets extends OnvoBase {
    dashboardId: string;
    constructor(endpoint: string, apiKey: string, dashboardId: string);
    list(): Promise<any>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, body: any): Promise<any>;
    create(body: any): Promise<any>;
}
