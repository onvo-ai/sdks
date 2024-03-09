import OnvoBase from "../base.js";
export declare class OnvoSessions extends OnvoBase {
    list(filters: {
        parent_dashboard: string;
    }): Promise<{
        created_at: string;
        dashboard: string;
        embed_user: string;
        parameters: string;
        team: string;
    }[]>;
    get(filters: {
        dashboard: string;
    }): Promise<{
        created_at: string;
        dashboard: string;
        embed_user: string;
        parameters: string;
        team: string;
    }>;
    delete(id: string): Promise<{
        success: true;
    }>;
    revokeAll(filters: {
        dashboard: string;
    }): Promise<{
        success: true;
    }>;
    upsert({ user, dashboard, parameters, }: {
        user: string;
        dashboard: string;
        parameters?: {
            [key: string]: any;
        };
    }): Promise<{
        created_at: string;
        dashboard: string;
        embed_user: string;
        parameters: string;
        team: string;
    } & {
        url: string;
    }>;
}
