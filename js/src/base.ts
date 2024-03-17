export default class OnvoBase {
  #apiKey: string;
  endpoint: string;

  // Base fetch method
  async fetchBase(
    url: string,
    method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH",
    body?: any,
    isForm?: boolean
  ) {
    try {
      let headers: any = {
        "Content-Type": isForm ? undefined : "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      };
      if (this.#apiKey && this.#apiKey.trim() !== "") {
        headers["x-api-key"] = this.#apiKey;
      }
      const response = await fetch(this.endpoint + url, {
        method: method || "GET",
        headers: headers,
        body: isForm ? body : body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        let data: any = await response.text();
        throw new Error(data);
      }
      let data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error("Error in making the request: " + error.message);
    }
  }

  // Base fetch method
  async fetchImage(
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
        mode: "no-cors",
        method: method || "GET",
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
      }).then((response) => response.blob());
      return response;
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
