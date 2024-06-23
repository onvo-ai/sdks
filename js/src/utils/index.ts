import OnvoBase from "../base";

export class OnvoUtils extends OnvoBase {
  /**
   * Uploads a file to a given bucket
   *
   * @param {Object} filters - The filters to apply to the question list.
   * @param {string} filters.dashboard - The ID of the dashboard to list questions for.
   * @returns {Promise<Question[]>} A promise that resolves to an array of questions.
   */
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.set("file", file);
    return this.fetchBase(
      "/api/utils/upload-file",
      "POST",
      formData,
      true
    ) as Promise<{ url: string }>;
  }
}
