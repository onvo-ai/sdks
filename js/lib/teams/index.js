"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoTeams = void 0;
const base_1 = __importDefault(require("../base.js"));
// Team endpoints
class OnvoTeams extends base_1.default {
    list() {
        return this.fetchBase("/api/teams");
    }
    get(id) {
        return this.fetchBase("/api/teams/" + id);
    }
    update(id, body) {
        return this.fetchBase("/api/teams/" + id, "POST", body);
    }
}
exports.OnvoTeams = OnvoTeams;
