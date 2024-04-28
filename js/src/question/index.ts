import OnvoBase from "../base";

export class OnvoQuestion extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  export(
    messageIndex: number,
    format: "svg" | "csv" | "xlsx" | "png" | "jpeg"
  ) {
    return this.fetchBlob(
      `/api/questions/${
        this.#id
      }/export?format=${format}&messageIndex=${messageIndex}`
    ) as Promise<Blob>;
  }
}
