import OnvoBase from "../base.js";
export declare class OnvoWidget extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    getImage(): Promise<any>;
}
