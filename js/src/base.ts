export default class OnvoBase {
  #apiKey: string;
  endpoint: string;

  // Base fetch method
  async fetchBase(
    url: string,
    method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH",
    body?: any
  ) {
    try {
      const response = await fetch(this.endpoint + url, {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.#apiKey,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      let data = response.json();
      if (!response.ok) {
        throw new Error("Error in making the request: " + data);
      }
      return data;
    } catch (error: any) {
      throw new Error("Error in making the request: " + error.message);
    }
  }

  async streamingFetch(
    url: string,
    method: "GET" | "PUT" | "POST" | "PATCH",
    body: any,
    callbacks: {
      onStream: (str: string) => void;
      onComplete: (str: string) => void;
      onError: (err: Error) => void;
    }
  ) {
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const response = await fetch(this.endpoint + url, {
        method: method || "GET",
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "x-api-key": this.#apiKey,
        },
        signal,
      });

      if (!response.ok) {
        console.log("Error streaming data: ", response);
        // @ts-ignore
        throw new Error(response.message);
      }

      let output = "";
      let data = response.body;
      if (!data) {
        throw new Error("No data in response");
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        output += chunkValue;
        callbacks.onStream(chunkValue);
      }
      callbacks.onComplete(output);
    } catch (e: any) {
      console.log(e);
      callbacks.onError(new Error(e.message));
    }
  }

  constructor(apiKey: string, options?: { endpoint: string }) {
    if (!apiKey) throw new Error("API key is required");
    this.#apiKey = apiKey;
    this.endpoint = options?.endpoint || "https:/dashboard.onvo.ai";
  }
}
