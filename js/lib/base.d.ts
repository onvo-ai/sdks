import { Method } from "axios";
export default class OnvoBase {
    #private;
    endpoint: string;
    fetchBase(url: string, method?: Method, body?: any): Promise<any>;
    constructor(apiKey: string, options?: {
        endpoint: string;
    });
}
