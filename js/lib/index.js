"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Onvo = void 0;
const base_1 = __importDefault(require("./base.js"));
const accounts_1 = require("./accounts/index.js");
const teams_1 = require("./teams/index.js");
const embed_users_1 = require("./embed_users/index.js");
const datasources_1 = require("./datasources/index.js");
const automations_1 = require("./automations/index.js");
const dashboards_1 = require("./dashboards/index.js");
const dashboard_1 = require("./dashboard/index.js");
const embed_user_1 = require("./embed_user/index.js");
const datasource_1 = require("./datasource/index.js");
const questions_1 = require("./questions/index.js");
const automation_1 = require("./automation/index.js");
const widget_1 = require("./widget/index.js");
const sessions_1 = require("./sessions/index.js");
const widgets_1 = require("./widgets/index.js");
__exportStar(require("./types/index.js"), exports);
class Onvo extends base_1.default {
    constructor(apiKey, options) {
        super(apiKey, options);
        this.accounts = new accounts_1.OnvoAccounts(apiKey, options);
        this.teams = new teams_1.OnvoTeams(apiKey, options);
        this.embed_users = new embed_users_1.OnvoEmbedUsers(apiKey, options);
        this.datasources = new datasources_1.OnvoDatasources(apiKey, options);
        this.automations = new automations_1.OnvoAutomations(apiKey, options);
        this.dashboards = new dashboards_1.OnvoDashboards(apiKey, options);
        this.questions = new questions_1.OnvoQuestions(apiKey, options);
        this.sessions = new sessions_1.OnvoSessions(apiKey, options);
        this.widgets = new widgets_1.OnvoWidgets(apiKey, options);
        this.dashboard = (dashboardId) => {
            return new dashboard_1.OnvoDashboard(dashboardId, apiKey, options);
        };
        this.embed_user = (embedUserId) => {
            return new embed_user_1.OnvoEmbedUser(embedUserId, apiKey, options);
        };
        this.datasource = (datasourceId) => {
            return new datasource_1.OnvoDatasource(datasourceId, apiKey, options);
        };
        this.automation = (automationId) => {
            return new automation_1.OnvoAutomation(automationId, apiKey, options);
        };
        this.widget = (widgetId) => {
            return new widget_1.OnvoWidget(widgetId, apiKey, options);
        };
    }
}
exports.Onvo = Onvo;
exports.default = Onvo;
