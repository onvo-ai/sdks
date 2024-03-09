import OnvoBase from "../base.js";
import { DataSource } from "../types/index.js";
export declare class OnvoDatasources extends OnvoBase {
    list(): Promise<DataSource[]>;
    get(id: string): Promise<DataSource>;
    delete(id: string): Promise<{
        success: true;
    }>;
    update(id: string, body: Partial<DataSource>): Promise<DataSource>;
    create(body: Omit<DataSource, "id">): Promise<DataSource>;
}
