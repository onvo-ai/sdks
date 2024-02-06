import { Method } from "axios";
export declare class OnvoDashboards {
    apiKey: string;
    endpoint: string;
    fetchBase(url: string, method?: Method, body?: any): Promise<void>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => any);
    list(): Promise<void>;
    get(id: string): Promise<void>;
    delete(id: string): Promise<void>;
    update(id: string, body: any): Promise<void>;
    create(body: any): Promise<void>;
}
