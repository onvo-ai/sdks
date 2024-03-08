import OnvoBase from "../base";
import { Question } from "../types";

// Question endpoints
export class OnvoQuestions extends OnvoBase {
  list(filters: { dashboard: string }) {
    return this.fetchBase(
      "/api/questions?dashboard=" + filters.dashboard
    ) as Promise<Question[]>;
  }
  create(
    payload: {
      messages: { role: "user" | "assistant"; content: string }[];
      dashboardId: string;
      questionId?: string;
    },
    callbacks: {
      onStream: (str: string) => void;
      onComplete: (str: string) => void;
      onError: (err: Error) => void;
    }
  ) {
    return this.streamingFetch(
      "/api/questions",
      "POST",
      {
        dashboard: payload.dashboardId,
        existingQuestion: payload.questionId || undefined,
        messages: payload.messages,
      },
      callbacks
    );
  }
  delete(id: string) {
    return this.fetchBase("/api/questions/" + id, "DELETE") as Promise<{
      success: true;
    }>;
  }
  update(id: string, body: Partial<Question>) {
    return this.fetchBase(
      "/api/questions/" + id,
      "POST",
      body
    ) as Promise<Question>;
  }
}
