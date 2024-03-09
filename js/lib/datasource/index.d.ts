import OnvoBase from "../base.js";
import { DataSource } from "../types/index.js";
export declare class OnvoDatasource extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    getData(): Promise<any>;
    fetchColumnDescriptions(): Promise<DataSource>;
}
