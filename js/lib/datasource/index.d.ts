import OnvoBase from "../base";
export declare class OnvoDatasource extends OnvoBase {
    id: string;
    constructor(endpoint: string, apiKey: string, id: string);
    getData(): Promise<any>;
    fetchColumnDescriptions(): Promise<any>;
}
