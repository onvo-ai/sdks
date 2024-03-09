import OnvoBase from "../base.js";
import { Widget } from "../types/index.js";
export declare class OnvoWidgets extends OnvoBase {
    list(filters: {
        dashboard: string;
    }): Promise<{
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
    get(id: string): Promise<{
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
    }>;
    delete(id: string): Promise<{
        success: true;
    }>;
    update(id: string, body: Partial<Widget>): Promise<{
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
    }>;
    create(body: Omit<Widget, "id">): Promise<{
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
    }>;
}
