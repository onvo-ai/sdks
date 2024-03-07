import OnvoBase from "../base.js";
export declare class OnvoWidgets extends OnvoBase {
    list(filters: {
        dashboard: string;
    }): Promise<any>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, body: any): Promise<any>;
    create({ query, dashboard }: {
        query: string;
        dashboard: string;
    }): Promise<any>;
}
