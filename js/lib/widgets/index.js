"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoWidgets = void 0;
const base_1 = __importDefault(require("../base.js"));
class OnvoWidgets extends base_1.default {
    // Dashboard Widget endpoints
    list(filters) {
        return this.fetchBase("/api/widgets?dashboard=" + filters.dashboard);
    }
    get(id) {
        return this.fetchBase("/api/widgets/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/widgets/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/widgets/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/widgets", "POST", body);
    }
}
exports.OnvoWidgets = OnvoWidgets;
