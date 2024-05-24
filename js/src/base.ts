export default class OnvoBase {
  #apiKey: string;
  endpoint: string;

  // Base fetch method
  /**
   * Fetches data from the API.
   * @param url - The URL to fetch data from.
   * @param method - The HTTP method to use. Defaults to "GET".
   * @param body - The data to send with the request.
   * @param isForm - Indicates if the request is a form request.
   * @returns The response from the API.
   * @throws {Error} If there is an error making the request.
   */
  async fetchBase(
    url: string,
    method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH",
    body?: any,
    isForm?: boolean
  ): Promise<any> {
    try {
      let headers: any = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      };
      if (this.#apiKey && this.#apiKey.trim() !== "") {
        headers["x-api-key"] = this.#apiKey;
      }
      if (!isForm) {
        headers["Content-Type"] = "application/json";
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

  /**
   * Fetches a Blob from the API.
   * @param url - The URL to fetch data from.
   * @returns The response from the API as a Blob.
   * @throws {Error} If there is an error making the request.
   */
  async fetchBlob(url: string): Promise<Blob> {
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
        method: "GET",
        headers: headers,
      }).then((response) => response.blob());
      return response;
    } catch (error: any) {
      throw new Error("Error in making the request: " + error.message);
    }
  }

  constructor(apiKey: string, options?: { endpoint: string }) {
    if (apiKey === undefined || apiKey === null)
      throw new Error("API key is required");
    this.#apiKey = apiKey;
    this.endpoint = options?.endpoint || "https://dashboard.onvo.ai";
  }
}
