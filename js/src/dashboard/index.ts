import { OnvoDashboardDatasources } from "../dashboard_datasources";
import OnvoBase from "../base";
import { Widget } from "../types";

export class OnvoDashboard extends OnvoBase {
  datasources: OnvoDashboardDatasources;
  #id: string;

  constructor(id: string, apiKey: string, options?: { endpoint: string }) {
    super(apiKey, options);
    this.#id = id;
    this.datasources = new OnvoDashboardDatasources(id, apiKey, options);
  }

  /**
   * Updates the widget cache for the dashboard.
   *
   * @return {Promise<Widget[]>} A promise that resolves to an array of widgets.
   */
  updateWidgetCache(): Promise<Widget[]> {
    return this.fetchBase(
      "/api/dashboards/" + this.#id + "/update-cache",
      "POST"
    ) as Promise<Widget[]>;
  }

  /**
   * Exports the dashboard in the specified format.
   *
   * @param {("csv" | "xlsx" | "pdf" | "png" | "jpeg")} format - The format to export the dashboard in.
   * @return {Promise<Blob>} A promise that resolves to a Blob representing the exported dashboard.
   */
  export(format: "csv" | "xlsx" | "pdf" | "png" | "jpeg"): Promise<Blob> {
    return this.fetchBlob(
      "/api/dashboards/" + this.#id + "/export?format=" + format
    );
  }

  /**
   * Summarizes the dashboard using the provided prompt.
   *
   * @param {string} prompt - The prompt to use for summarizing the dashboard.
   * @return {Promise<{title: string, description: string}>} A promise that resolves to an object containing the title and description of the summarized dashboard.
   */
  summarize(prompt: string): Promise<{ title: string; description: string }> {
    return this.fetchBase(`/api/dashboards/${this.#id}/summarize`, "POST", {
      prompt,
    });
  }
}
