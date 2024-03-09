"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoAutomations = void 0;
const base_1 = __importDefault(require("../base.js"));
// Automation endpoints
class OnvoAutomations extends base_1.default {
    list() {
        return this.fetchBase("/api/automations");
    }
    get(id) {
        return this.fetchBase("/api/automations/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/automations/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/automations/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/automations", "PUT", body);
    }
}
exports.OnvoAutomations = OnvoAutomations;
