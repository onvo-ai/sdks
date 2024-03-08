import OnvoBase from "../base.js";
import { Widget } from "../types/index.js";
export declare class OnvoWidgets extends OnvoBase {
    list(filters: {
        dashboard: string;
    }): Promise<any>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, body: Partial<Widget>): Promise<any>;
    create(body: Omit<Widget, "id">): Promise<any>;
}
