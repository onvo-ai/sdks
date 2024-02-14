import OnvoBase from "../base";
export declare class OnvoAutomation extends OnvoBase {
    #private;
    constructor(id: string, apiKey: string, options?: {
        endpoint: string;
    });
    getRuns(): Promise<{
        automation: string;
        id: string;
        recipient_emails: string[] | null;
        run_at: string;
        status: string;
        team: string;
    }[]>;
}
