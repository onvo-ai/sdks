import OnvoBase from "../base.js";
export declare class OnvoEmbedUsers extends OnvoBase {
    list(): Promise<{
        created_at: string;
        email: string | null;
        id: string;
        last_updated_at: string;
        metadata: import("../types/index.js").Json;
        name: string;
        team: string;
    }[]>;
    get(id: string): Promise<{
        created_at: string;
        email: string | null;
        id: string;
        last_updated_at: string;
        metadata: import("../types/index.js").Json;
        name: string;
        team: string;
    }>;
    delete(id: string): Promise<{
        success: true;
    }>;
    upsert(userId: string, userData: {
        name: string;
        email: string;
        metadata: {
            [key: string]: any;
        };
    }): Promise<{
        created_at: string;
        email: string | null;
        id: string;
        last_updated_at: string;
        metadata: import("../types/index.js").Json;
        name: string;
        team: string;
    }>;
}
