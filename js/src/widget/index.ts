import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoWidget extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  export(format: "svg" | "csv" | "xlsx" | "png" | "jpeg") {
    return this.fetchBlob(
      "/api/widgets/" + this.#id + "/export?format=" + format
    ) as Promise<Blob>;
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
