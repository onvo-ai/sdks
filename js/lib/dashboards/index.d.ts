import OnvoBase from "../base.js";
import { Dashboard } from "../types/index.js";
export declare class OnvoDashboards extends OnvoBase {
    list(): Promise<Dashboard[]>;
    get(id: string): Promise<Dashboard>;
    delete(id: string): Promise<{
        success: true;
    }>;
    update(id: string, body: Partial<Dashboard>): Promise<Dashboard>;
    create(body: Omit<Dashboard, "id">): Promise<Dashboard>;
}
