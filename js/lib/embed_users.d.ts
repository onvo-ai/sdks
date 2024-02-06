import { Method } from "axios";
export declare class OnvoEmbedUsers {
    apiKey: string;
    endpoint: string;
    fetchBase: (url: string, method?: Method, body?: any) => Promise<any>;
    constructor(endpoint: string, apiKey: string, fetchBase: (url: string, method?: Method, body?: any) => Promise<any>);
    list(): Promise<any>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    upsert(userId: string, userData: {
        name: string;
        email: string;
        metadata: {
            [key: string]: any;
        };
    }): Promise<any>;
    getAccessToken(id: string): Promise<any>;
}
