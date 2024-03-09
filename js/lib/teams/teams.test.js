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
const index_1 = require("./index.js");
describe("Teams", () => {
    let onvoTeams;
    beforeEach(() => {
        onvoTeams = new index_1.OnvoTeams("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k", {
            endpoint: "https://staging.onvo.ai",
        });
    });
    afterAll(() => {
        return onvoTeams.update("3d05b990-c855-4945-bdd1-b3a8305ffc59", {
            name: "Testing team",
        });
    });
    it("should list teams", () => __awaiter(void 0, void 0, void 0, function* () {
        const accounts = yield onvoTeams.list();
        expect(accounts).toBeDefined();
        expect(accounts.length).toBeGreaterThan(0);
        expect(accounts[0].id).toBeDefined();
        expect(accounts[0].name).toBeDefined();
        expect(accounts[0].logo).toBeDefined();
        expect(accounts[0].phone_number).toBeDefined();
        expect(accounts[0].email).toBeDefined();
    }));
    it("should get a team", () => __awaiter(void 0, void 0, void 0, function* () {
        const account = yield onvoTeams.get("3d05b990-c855-4945-bdd1-b3a8305ffc59");
        expect(account.id).toBeDefined();
        expect(account.name).toBeDefined();
        expect(account.logo).toBeDefined();
        expect(account.phone_number).toBeDefined();
        expect(account.email).toBeDefined();
    }));
    it("should update a team", () => __awaiter(void 0, void 0, void 0, function* () {
        const account = yield onvoTeams.update("3d05b990-c855-4945-bdd1-b3a8305ffc59", {
            name: "In test",
        });
        expect(account.name).toEqual("In test");
    }));
});
