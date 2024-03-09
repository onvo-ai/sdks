"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoSessions = void 0;
const base_1 = __importDefault(require("../base.js"));
class OnvoSessions extends base_1.default {
    // Dashboard Session endpoints
    list(filters) {
        return this.fetchBase("/api/sessions?parent_dashboard=" + filters.parent_dashboard);
    }
    get(filters) {
        return this.fetchBase("/api/sessions?dashboard=" + filters.dashboard);
    }
    delete(id) {
        return this.fetchBase("/api/sessions?dashboard=" + id, "DELETE");
    }
    revokeAll(filters) {
        return this.fetchBase("/api/sessions?parent_dashboard=" + filters.dashboard, "DELETE");
    }
    upsert({ user, dashboard, parameters, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.fetchBase("/api/sessions", "POST", {
                user: user,
                parameters: parameters,
                dashboard: dashboard,
            });
            return Object.assign(Object.assign({}, data), { url: this.endpoint + data.url });
        });
    }
}
exports.OnvoSessions = OnvoSessions;
