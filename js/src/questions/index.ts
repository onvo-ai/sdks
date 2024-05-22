import OnvoBase from "../base";
import { Question } from "../types";

// Question endpoints
export class OnvoQuestions extends OnvoBase {
  /**
   * Lists all questions for a given dashboard.
   *
   * @param {Object} filters - The filters to apply to the question list.
   * @param {string} filters.dashboard - The ID of the dashboard to list questions for.
   * @returns {Promise<Question[]>} A promise that resolves to an array of questions.
   */
  list(filters: { dashboard: string }): Promise<Question[]> {
    return this.fetchBase(
      "/api/questions?dashboard=" + filters.dashboard
    ) as Promise<Question[]>;
  }

  /**
   * Creates a new question.
   *
   * @param {Object} payload - The payload for the question creation.
   * @param {Array<Object>} payload.messages - The messages to include in the question.
   * @param {string} payload.dashboardId - The ID of the dashboard to create the question in.
   * @param {string} [payload.questionId] - The ID of the question to update (optional).
   * @returns {Promise<Question>} A promise that resolves to the created question.
   */
  create(payload: {
    messages: { role: "user" | "assistant"; content: string }[];
    dashboardId: string;
    questionId?: string;
  }): Promise<Question> {
    return this.fetchBase("/api/questions", "POST", {
      dashboard: payload.dashboardId,
      id: payload.questionId || undefined,
      messages: payload.messages,
    }) as Promise<Question>;
  }

  /**
   * Deletes a question.
   *
   * @param {string} id - The ID of the question to delete.
   * @returns {Promise<{ success: boolean }>} A promise that resolves to an object indicating success.
   */
  delete(id: string): Promise<{ success: boolean }> {
    return this.fetchBase("/api/questions/" + id, "DELETE") as Promise<{
      success: boolean;
    }>;
  }

  /**
   * Updates a question.
   *
   * @param {string} id - The ID of the question to update.
   * @param {Partial<Question>} body - The updated question data.
   * @returns {Promise<Question>} A promise that resolves to the updated question.
   */
  update(id: string, body: Partial<Question>): Promise<Question> {
    return this.fetchBase(
      "/api/questions/" + id,
      "POST",
      body
    ) as Promise<Question>;
  }
}
