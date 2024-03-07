import OnvoBase from "../base.js";
export declare class OnvoAccounts extends OnvoBase {
    list(): Promise<{
        avatar_url: string | null;
        email: string | null;
        full_name: string | null;
        id: string;
        phone_number: string | null;
        updated_at: string | null;
    }[]>;
    get(id: string): Promise<{
        avatar_url: string | null;
        email: string | null;
        full_name: string | null;
        id: string;
        phone_number: string | null;
        updated_at: string | null;
    }>;
}
