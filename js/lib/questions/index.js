"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoQuestions = void 0;
const base_1 = __importDefault(require("../base.js"));
// Question endpoints
class OnvoQuestions extends base_1.default {
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
exports.OnvoQuestions = OnvoQuestions;
