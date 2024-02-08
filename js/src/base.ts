import axios, { Method } from "axios";
export default class OnvoBase {
  apiKey: string;
  endpoint: string;

  // Base fetch method
  async fetchBase(url: string, method?: Method, body?: any) {
    try {
      const response = await axios({
        method: method || "GET",
        url: this.endpoint + url,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
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

  constructor(endpoint: string, apiKey: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }
}
