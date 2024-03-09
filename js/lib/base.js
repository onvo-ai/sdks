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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _OnvoBase_apiKey;
Object.defineProperty(exports, "__esModule", { value: true });
class OnvoBase {
    // Base fetch method
    fetchBase(url, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.endpoint + url, {
                    method: method || "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": __classPrivateFieldGet(this, _OnvoBase_apiKey, "f"),
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                    body: body ? JSON.stringify(body) : undefined,
                });
                let data = response.json();
                if (!response.ok) {
                    throw new Error("Error in making the request: " + data);
                }
                return data;
            }
            catch (error) {
                throw new Error("Error in making the request: " + error.message);
            }
        });
    }
    streamingFetch(url, method, body, callbacks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const controller = new AbortController();
                const signal = controller.signal;
                const response = yield fetch(this.endpoint + url, {
                    method: method || "GET",
                    body: body ? JSON.stringify(body) : undefined,
                    headers: {
                        "x-api-key": __classPrivateFieldGet(this, _OnvoBase_apiKey, "f"),
                    },
                    signal,
                });
                if (!response.ok) {
                    console.log("Error streaming data: ", response);
                    // @ts-ignore
                    throw new Error(response.message);
                }
                let output = "";
                let data = response.body;
                if (!data) {
                    throw new Error("No data in response");
                }
                const reader = data.getReader();
                const decoder = new TextDecoder();
                let done = false;
                while (!done) {
                    const { value, done: doneReading } = yield reader.read();
                    done = doneReading;
                    const chunkValue = decoder.decode(value);
                    output += chunkValue;
                    callbacks.onStream(chunkValue);
                }
                callbacks.onComplete(output);
            }
            catch (e) {
                console.log(e);
                callbacks.onError(new Error(e.message));
            }
        });
    }
    constructor(apiKey, options) {
        _OnvoBase_apiKey.set(this, void 0);
        if (!apiKey)
            throw new Error("API key is required");
        __classPrivateFieldSet(this, _OnvoBase_apiKey, apiKey, "f");
        this.endpoint = (options === null || options === void 0 ? void 0 : options.endpoint) || "https:/dashboard.onvo.ai";
    }
}
_OnvoBase_apiKey = new WeakMap();
exports.default = OnvoBase;
