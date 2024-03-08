import axios, { Method } from "axios";
export default class OnvoBase {
  #apiKey: string;
  endpoint: string;

  // Base fetch method
  async fetchBase(url: string, method?: Method, body?: any) {
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
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("No response received from the server");
      } else {
        throw new Error("Error in making the request: " + error.message);
      }
    }
  }

  async streamingFetch(
    url: string,
    method: Method,
    body: any,
    callbacks: {
      onStream: (str: string) => void;
      onComplete: (str: string) => void;
      onError: (err: Error) => void;
    }
  ) {
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

      response.data.on("data", (chunk: Buffer) => {
        const chunkValue = decoder.decode(chunk);
        output += chunkValue;
        callbacks.onStream(chunkValue);
      });

      response.data.on("end", () => {
        callbacks.onComplete(output);
      });

      response.data.on("error", (err: Error) => {
        console.log(err);
        callbacks.onError(err);
      });
    } catch (e: any) {
      console.log(e);
      callbacks.onError(new Error(e.message));
    }
  }

  constructor(apiKey: string, options?: { endpoint: string }) {
    this.#apiKey = apiKey;
    this.endpoint = options?.endpoint || "https:/dashboard.onvo.ai";
  }
}
