import OnvoBase from "../base";
export declare class OnvoSessions extends OnvoBase {
    list(filters: {
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
