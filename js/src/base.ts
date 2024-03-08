import fetch from "cross-fetch";
export default class OnvoBase {
  #apiKey: string;
  endpoint: string;

  // Base fetch method
  async fetchBase(
    url: string,
    method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS",
    body?: any
  ) {
    try {
      const requestOptions: RequestInit = {
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
    } catch (error: any) {
      console.log(error);
      throw new Error("Error in making the request: " + error.message);
    }
  }

  async streamingFetch(
    url: string,
    method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "OPTIONS",
    body: any,
    callbacks: {
      onStream: (str: string) => void;
      onComplete: (str: string) => void;
      onError: (err: Error) => void;
    }
  ) {
    try {
      const requestOptions: RequestInit = {
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

      const readChunk = async ({
        done,
        value,
      }: {
        done: boolean;
        value: Uint8Array;
      }) => {
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
    } catch (err: any) {
      console.log(err);
      callbacks.onError(err);
    }
  }

  constructor(apiKey: string, options?: { endpoint: string }) {
    this.#apiKey = apiKey;
    this.endpoint = options?.endpoint || "https:/dashboard.onvo.ai";
  }
}
