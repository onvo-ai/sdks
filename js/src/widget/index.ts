import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoWidget extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  getImage() {
    return this.fetchBase(
      "/api/widgets/" + this.#id + "/image"
    ) as Promise<any>;
  }
  updatePrompts(messages: { role: "user" | "assistant"; content: String }[]) {
    return this.fetchBase("/api/widgets/" + this.#id, "PATCH", {
      messages,
    }) as Promise<Widget>;
  }
  executeCode(code: string) {
    return this.fetchBase(
      "/api/widgets/" + this.#id + "/execute-code",
      "POST",
      {
        code,
      }
    ) as Promise<any>;
  }
}
