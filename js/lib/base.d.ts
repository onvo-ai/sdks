import { Method } from "axios";
export default class OnvoBase {
    apiKey: string;
    endpoint: string;
    fetchBase(url: string, method?: Method, body?: any): Promise<any>;
    constructor(endpoint: string, apiKey: string);
}
