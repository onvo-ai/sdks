"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoAccounts = void 0;
const base_1 = __importDefault(require("../base.js"));
// Account endpoints
class OnvoAccounts extends base_1.default {
    list() {
        return this.fetchBase("/api/accounts");
    }
    get(id) {
        return this.fetchBase("/api/accounts/" + id);
    }
}
exports.OnvoAccounts = OnvoAccounts;
