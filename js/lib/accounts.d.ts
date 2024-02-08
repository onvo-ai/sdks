import OnvoBase from "./base";
export declare class OnvoAccounts extends OnvoBase {
    list(): Promise<any>;
    get(id: string): Promise<any>;
}
