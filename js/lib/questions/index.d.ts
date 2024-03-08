import OnvoBase from "../base.js";
import { Question } from "../types/index.js";
export declare class OnvoQuestions extends OnvoBase {
    list(filters: {
        dashboard: string;
    }): Promise<{
        account: string | null;
        created_at: string;
        dashboard: string;
        embed_user: string | null;
        id: string;
        messages: import("../types/index.js").Json;
        query: string;
        team: string | null;
    }[]>;
    create(payload: {
        messages: {
            role: "user" | "assistant";
            content: string;
        }[];
        dashboardId: string;
        questionId?: string;
    }, callbacks: {
        onStream: (str: string) => void;
        onComplete: (str: string) => void;
        onError: (err: Error) => void;
    }): Promise<void>;
    delete(id: string): Promise<{
        success: true;
    }>;
    update(id: string, body: Partial<Question>): Promise<{
        account: string | null;
        created_at: string;
        dashboard: string;
        embed_user: string | null;
        id: string;
        messages: import("../types/index.js").Json;
        query: string;
        team: string | null;
    }>;
}
