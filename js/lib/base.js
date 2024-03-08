import fetch from "cross-fetch";
export default class OnvoBase {
    #apiKey;
    endpoint;
    // Base fetch method
    async fetchBase(url, method, body) {
        try {
            const requestOptions = {
                method: method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.#apiKey,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            };
            if (body) {
                requestOptions.body = JSON.stringify(body);
            }
            const response = await fetch(this.endpoint + url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error in making the request: " + error.message);
        }
    }
    async streamingFetch(url, method, body, callbacks) {
        try {
            const requestOptions = {
                method: method || "GET",
                headers: {
                    "x-api-key": this.#apiKey,
                },
            };
            if (body) {
                requestOptions.body = JSON.stringify(body);
            }
            const response = await fetch(this.endpoint + url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("Response body is missing");
            }
            const decoder = new TextDecoder();
            let output = "";
            const readChunk = async ({ done, value, }) => {
                if (done) {
                    callbacks.onComplete(output);
                    return;
                }
                const chunkValue = decoder.decode(value, { stream: true });
                output += chunkValue;
                callbacks.onStream(chunkValue);
                const { done: streamDone, value: nextValue } = await reader.read();
                if (!nextValue) {
                    callbacks.onComplete(output);
                    return;
                }
                readChunk({ done: streamDone, value: nextValue });
            };
            // @ts-ignore
            readChunk(await reader.read());
        }
        catch (err) {
            console.log(err);
            callbacks.onError(err);
        }
    }
    constructor(apiKey, options) {
        this.#apiKey = apiKey;
        this.endpoint = options?.endpoint || "https:/dashboard.onvo.ai";
    }
}
