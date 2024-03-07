import OnvoBase from "../base.js";
export declare class OnvoSessions extends OnvoBase {
    list(filters: {
        parent_dashboard: string;
    }): Promise<any>;
    get(filters: {
        dashboard: string;
    }): Promise<any>;
    delete(id: string): Promise<any>;
    revokeAll(filters: {
        dashboard: string;
    }): Promise<any>;
    upsert({ user, dashboard, parameters, }: {
        user: string;
        dashboard: string;
        parameters?: {
            [key: string]: any;
        };
    }): Promise<any>;
}
