import OnvoBase from "../base";
export declare class OnvoDatasource extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    getData(): Promise<any>;
    fetchColumnDescriptions(): Promise<any>;
}
