import OnvoBase from "../base.js";
export declare class OnvoDatasources extends OnvoBase {
    list(): Promise<any>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    update(id: string, body: any): Promise<any>;
    create(body: any): Promise<any>;
}
