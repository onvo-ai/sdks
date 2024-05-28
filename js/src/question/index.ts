import OnvoBase from "../base";

export class OnvoQuestion extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  /**
   * Exports the question in the specified format.
   *
   * @param {number} messageIndex - The index of the message to export.
   * @param {("svg" | "csv" | "xlsx" | "png" | "jpeg")} format - The format to export the question in.
   * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported question.
   */
  export(
    messageIndex: number,
    format: "svg" | "csv" | "xlsx" | "png" | "jpeg"
  ): Promise<Blob> {
    return this.fetchBlob(
      `/api/questions/${
        this.#id
      }/export?format=${format}&messageIndex=${messageIndex}`
    ) as Promise<Blob>;
  }
}
