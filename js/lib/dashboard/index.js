"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _OnvoDashboard_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoDashboard = void 0;
const dashboard_datasources_1 = require("./dashboard_datasources.js");
const base_1 = __importDefault(require("../base.js"));
class OnvoDashboard extends base_1.default {
    constructor(id, apiKey, options) {
        super(apiKey, options);
        _OnvoDashboard_id.set(this, void 0);
        __classPrivateFieldSet(this, _OnvoDashboard_id, id, "f");
        this.datasources = new dashboard_datasources_1.OnvoDashboardDatasources(id, apiKey, options);
    }
    updateWidgetCache() {
        return this.fetchBase("/api/dashboards/" + __classPrivateFieldGet(this, _OnvoDashboard_id, "f") + "/update-cache", "POST");
    }
    getWidgetSuggestions() {
        return this.fetchBase("/api/dashboards/" + __classPrivateFieldGet(this, _OnvoDashboard_id, "f") + "/widget-suggestions");
    }
}
exports.OnvoDashboard = OnvoDashboard;
_OnvoDashboard_id = new WeakMap();
