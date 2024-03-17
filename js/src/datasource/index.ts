import OnvoBase from "../base";
import { DataSource } from "../types";

export class OnvoDatasource extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  initialize() {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/initialize"
    ) as Promise<DataSource>;
  }
  uploadFile(file: File) {
    const formData = new FormData();
    formData.set("file", file, file.name);
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/upload-file",
      "POST",
      formData,
      true
    ) as Promise<DataSource>;
  }
}
