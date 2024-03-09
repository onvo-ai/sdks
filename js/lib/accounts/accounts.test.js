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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index.js");
describe("Accounts", () => {
    let onvo;
    beforeEach(() => {
        onvo = new index_1.Onvo("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k", {
            endpoint: "https://staging.onvo.ai",
        });
    });
    it("should list accounts", () => __awaiter(void 0, void 0, void 0, function* () {
        const accounts = yield onvo.accounts.list();
        expect(accounts).toBeDefined();
        expect(accounts.length).toBeGreaterThan(0);
        expect(accounts[0].id).toBeDefined();
        expect(accounts[0].full_name).toBeDefined();
        expect(accounts[0].avatar_url).toBeDefined();
        expect(accounts[0].updated_at).toBeDefined();
        expect(accounts[0].email).toBeDefined();
    }));
    it("should get an account", () => __awaiter(void 0, void 0, void 0, function* () {
        const account = yield onvo.accounts.get("1bda55a1-ae08-42e4-a27b-f1a122356789");
        expect(account.id).toBeDefined();
        expect(account.full_name).toBeDefined();
        expect(account.avatar_url).toBeDefined();
        expect(account.updated_at).toBeDefined();
        expect(account.email).toBeDefined();
    }));
});
