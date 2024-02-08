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
    constructor(apiKey, options) {
        this.#apiKey = apiKey;
        this.endpoint = options?.endpoint || "https:/dashboard.onvo.ai";
    }
}
