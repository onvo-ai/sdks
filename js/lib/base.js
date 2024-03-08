import axios from "axios";
export default class OnvoBase {
    #apiKey;
    endpoint;
    // Base fetch method
    async fetchBase(url, method, body) {
        try {
            const response = await axios({
                method: method || "GET",
                url: this.endpoint + url,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.#apiKey,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
                data: body,
            });
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            }
            else if (error.request) {
                throw new Error("No response received from the server");
            }
            else {
                throw new Error("Error in making the request: " + error.message);
            }
        }
    }
    async streamingFetch(url, method, body, callbacks) {
        try {
            const response = await axios({
                url: this.endpoint + url,
                method: method || "GET",
                data: body,
                headers: {
                    "x-api-key": this.#apiKey,
                },
                responseType: "stream",
            });
            let output = "";
            const decoder = new TextDecoder();
            response.data.on("data", (chunk) => {
                const chunkValue = decoder.decode(chunk);
                output += chunkValue;
                callbacks.onStream(chunkValue);
            });
            response.data.on("end", () => {
                callbacks.onComplete(output);
            });
            response.data.on("error", (err) => {
                console.log(err);
                callbacks.onError(err);
            });
        }
        catch (e) {
            console.log(e);
            callbacks.onError(new Error(e.message));
        }
    }
    constructor(apiKey, options) {
        this.#apiKey = apiKey;
        this.endpoint = options?.endpoint || "https:/dashboard.onvo.ai";
    }
}
