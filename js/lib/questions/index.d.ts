import OnvoBase from "../base.js";
export declare class OnvoQuestions extends OnvoBase {
    list(filters: {
        dashboard: string;
    }): Promise<any>;
    create(payload: {
        query: string;
        dashboard: string;
    }): Promise<any>;
    delete(id: string): Promise<any>;
}
