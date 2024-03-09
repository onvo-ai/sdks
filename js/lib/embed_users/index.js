"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoEmbedUsers = void 0;
const base_1 = __importDefault(require("../base.js"));
// Embed user endpoints
class OnvoEmbedUsers extends base_1.default {
    list() {
        return this.fetchBase("/api/embed-users");
    }
    get(id) {
        return this.fetchBase("/api/embed-users/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/embed-users/" + id, "DELETE");
    }
    upsert(userId, userData) {
        return this.fetchBase("/api/embed-users", "POST", {
            id: userId,
            name: userData.name,
            email: userData.email,
            metadata: userData.metadata,
        });
    }
}
exports.OnvoEmbedUsers = OnvoEmbedUsers;
