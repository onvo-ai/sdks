import OnvoBase from "../base";
export declare class OnvoAutomation extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    getRuns(): Promise<any>;
}
