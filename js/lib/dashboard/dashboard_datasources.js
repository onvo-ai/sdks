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
var _OnvoDashboardDatasources_dashboardId;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoDashboardDatasources = void 0;
const base_1 = __importDefault(require("../base.js"));
class OnvoDashboardDatasources extends base_1.default {
    constructor(dashboardId, apiKey, options) {
        super(apiKey, options);
        _OnvoDashboardDatasources_dashboardId.set(this, void 0);
        __classPrivateFieldSet(this, _OnvoDashboardDatasources_dashboardId, dashboardId, "f");
    }
    // Dashboard Datasource endpoints
    list() {
        return this.fetchBase("/api/dashboards/" + __classPrivateFieldGet(this, _OnvoDashboardDatasources_dashboardId, "f") + "/datasources");
    }
    unlink(datasourceId) {
        return this.fetchBase("/api/dashboards/" + __classPrivateFieldGet(this, _OnvoDashboardDatasources_dashboardId, "f") + "/datasources/" + datasourceId, "DELETE");
    }
    link(datasourceId) {
        return this.fetchBase("/api/dashboards/" + __classPrivateFieldGet(this, _OnvoDashboardDatasources_dashboardId, "f") + "/datasources", "PUT", {
            datasourceId: datasourceId,
        });
    }
}
exports.OnvoDashboardDatasources = OnvoDashboardDatasources;
_OnvoDashboardDatasources_dashboardId = new WeakMap();
