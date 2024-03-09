"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoDashboards = void 0;
const base_1 = __importDefault(require("../base.js"));
// Dashboard endpoints
class OnvoDashboards extends base_1.default {
    list() {
        return this.fetchBase("/api/dashboards");
    }
    get(id) {
        return this.fetchBase("/api/dashboards/" + id);
    }
    delete(id) {
        return this.fetchBase("/api/dashboards/" + id, "DELETE");
    }
    update(id, body) {
        return this.fetchBase("/api/dashboards/" + id, "POST", body);
    }
    create(body) {
        return this.fetchBase("/api/dashboards", "PUT", body);
    }
}
exports.OnvoDashboards = OnvoDashboards;
