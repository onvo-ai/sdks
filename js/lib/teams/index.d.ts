import OnvoBase from "../base";
import { Team } from "../types";
export declare class OnvoTeams extends OnvoBase {
    list(): Promise<{
        created_at: string | null;
        email: string | null;
        id: string;
        logo: string | null;
        name: string | null;
        phone_number: string | null;
        stripe_id: string | null;
    }[]>;
    get(id: string): Promise<{
        created_at: string | null;
        email: string | null;
        id: string;
        logo: string | null;
        name: string | null;
        phone_number: string | null;
        stripe_id: string | null;
    }>;
    update(id: string, body: Partial<Team>): Promise<{
        created_at: string | null;
        email: string | null;
        id: string;
        logo: string | null;
        name: string | null;
        phone_number: string | null;
        stripe_id: string | null;
    }>;
}
