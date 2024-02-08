import OnvoBase from "../base";
export declare class OnvoEmbedUser extends OnvoBase {
    id: string;
    constructor(endpoint: string, apiKey: string, id: string);
    getAccessToken(): Promise<any>;
}
