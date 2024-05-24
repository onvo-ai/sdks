import OnvoBase from "../base";
import { DataSource } from "../types";

export class OnvoDatasource extends OnvoBase {
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
  }

  /**
   * Initializes the data source.
   * @returns {Promise<DataSource>} A promise that resolves to the data source object.
   */
  initialize(): Promise<DataSource> {
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/initialize"
    ) as Promise<DataSource>;
  }

  /**
   * Uploads a file to the data source.
   * @param {File} file - The file to upload.
   * @returns {Promise<DataSource>} A promise that resolves to the data source object.
   */
  uploadFile(file: File): Promise<DataSource> {
    const formData = new FormData();
    formData.set("file", file);
    return this.fetchBase(
      "/api/datasources/" + this.#id + "/upload-file",
      "POST",
      formData,
      true
    ) as Promise<DataSource>;
  }
}
