import OnvoBase from "../base";
export declare class OnvoEmbedUsers extends OnvoBase {
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
}
