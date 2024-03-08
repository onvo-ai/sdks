import OnvoBase from "../base.js";
// Question endpoints
export class OnvoQuestions extends OnvoBase {
    list(filters) {
        return this.fetchBase("/api/questions?dashboard=" + filters.dashboard);
    }
    create(payload, callbacks) {
        return this.streamingFetch("/api/questions", "POST", {
            dashboard: payload.dashboardId,
            existingQuestion: payload.questionId || undefined,
            messages: payload.messages,
        }, callbacks);
    }
    delete(id) {
        return this.fetchBase("/api/questions/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/questions/" + id, "POST", body);
    }
}
