import OnvoBase from "./base";
export declare class OnvoTeams extends OnvoBase {
    list(): Promise<any>;
    get(id: string): Promise<any>;
    update(id: string, body: any): Promise<any>;
}
