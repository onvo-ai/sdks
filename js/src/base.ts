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
      let headers: any = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      };
      if (this.#apiKey && this.#apiKey.trim() !== "") {
        headers["x-api-key"] = this.#apiKey;
      }
      const response = await fetch(this.endpoint + url, {
        method: method || "GET",
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      let data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data;
    } catch (error: any) {
      throw new Error("Error in making the request: " + error.message);
    }
  }

  constructor(apiKey: string, options?: { endpoint: string }) {
    if (!apiKey) throw new Error("API key is required");
    this.#apiKey = apiKey;
    this.endpoint = options?.endpoint || "https://dashboard.onvo.ai";
  }
}
