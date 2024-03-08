import { Method } from "axios";
export default class OnvoBase {
    #private;
    endpoint: string;
    fetchBase(url: string, method?: Method, body?: any): Promise<any>;
    streamingFetch(url: string, method: Method, body: any, callbacks: {
        onStream: (str: string) => void;
        onComplete: (str: string) => void;
        onError: (err: Error) => void;
    }): Promise<void>;
    constructor(apiKey: string, options?: {
        endpoint: string;
    });
}
