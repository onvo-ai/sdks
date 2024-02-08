import OnvoBase from "../base";
export declare class OnvoEmbedUser extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    getAccessToken(): Promise<any>;
}
