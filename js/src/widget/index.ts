import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoWidget extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  /**
   * Exports the widget in the specified format.
   *
   * @param {("svg" | "csv" | "xlsx" | "png" | "jpeg")} format - The format to export the widget in.
   * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported widget.
   */
  export(format: "svg" | "csv" | "xlsx" | "png" | "jpeg"): Promise<Blob> {
    return this.fetchBlob(
      "/api/widgets/" + this.#id + "/export?format=" + format
    ) as Promise<Blob>;
  }
  /**
   * Updates the prompts for the widget.
   *
   * @param {Array<{ role: "user" | "assistant"; content: String }>} messages - The new prompts for the widget.
   * @return {Promise<Widget>} A promise that resolves to the updated widget.
   */
  updatePrompts(
    messages: { role: "user" | "assistant"; content: String }[]
  ): Promise<Widget> {
    return this.fetchBase("/api/widgets/" + this.#id, "PATCH", {
      messages,
    }) as Promise<Widget>;
  }
  /**
   * Executes the given code in the widget.
   *
   * @param {string} code - The code to execute in the widget.
   * @return {Promise<any>} A promise that resolves to the result of executing the code.
   */
  executeCode(code: string): Promise<any> {
    return this.fetchBase(
      "/api/widgets/" + this.#id + "/execute-code",
      "POST",
      {
        code,
      }
    ) as Promise<any>;
  }
}
