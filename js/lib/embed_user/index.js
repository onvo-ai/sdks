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
var _OnvoEmbedUser_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnvoEmbedUser = void 0;
const base_1 = __importDefault(require("../base.js"));
class OnvoEmbedUser extends base_1.default {
    constructor(id, apiKey, options) {
        super(apiKey, options);
        _OnvoEmbedUser_id.set(this, void 0);
        __classPrivateFieldSet(this, _OnvoEmbedUser_id, id, "f");
    }
    getAccessToken() {
        return this.fetchBase("/api/embed-users/" + __classPrivateFieldGet(this, _OnvoEmbedUser_id, "f") + "/token");
    }
}
exports.OnvoEmbedUser = OnvoEmbedUser;
_OnvoEmbedUser_id = new WeakMap();
