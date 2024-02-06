import { Method } from "axios";
export declare class OnvoAutomations {
    apiKey: string;
    endpoint: string;
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => Promise<any>);
    list(): Promise<any>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, body: any): Promise<any>;
    create(body: any): Promise<any>;
}
