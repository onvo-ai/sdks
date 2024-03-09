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
describe("Automations", () => {
    let onvoAutomations;
    let automation;
    beforeEach(() => {
        onvoAutomations = new index_1.OnvoAutomations("eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k", {
            endpoint: "https://staging.onvo.ai",
        });
    });
    describe("Automations creation", () => {
        it("should create an automation", () => __awaiter(void 0, void 0, void 0, function* () {
            automation = yield onvoAutomations.create({
                created_at: new Date().toISOString(),
                last_updated_at: new Date().toISOString(),
                created_by: "1bda55a1-ae08-42e4-a27b-f1a122356789",
                last_updated_by: "1bda55a1-ae08-42e4-a27b-f1a122356789",
                enabled: false,
                team: "1bda55a1-ae08-42e4-a27b-f1a122356789",
                title: "Testing Automation",
                description: "",
                dashboard: "42058ac8-a83b-4e26-8b3c-b86a773d052a",
                output_format: "link",
                schedule: "",
                recipient_type: "internal",
                recipients: [],
                email_format: "Hello {{name}}, &#10;Here is your automated email from Onvo AI.<br />You can find the dashboard below:<br />{{link}}",
                email_subject: "Automated email from Onvo AI",
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            expect(automation).toBeDefined();
        }));
    });
    describe("Automations creation", () => {
        it("should list automations", () => __awaiter(void 0, void 0, void 0, function* () {
            const automations = yield onvoAutomations.list();
            expect(automations).toBeDefined();
            expect(automations.length).toBeGreaterThan(0);
        }));
        it("should get an automation", () => __awaiter(void 0, void 0, void 0, function* () {
            const fetchedAutomation = yield onvoAutomations.get(automation.id);
            expect(fetchedAutomation).toBeDefined();
            expect(fetchedAutomation.id).toBe(automation.id);
        }));
        it("should update an automation", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedAutomation = yield onvoAutomations.update(automation.id, {
                title: "Testing Automation Name Change",
            });
            expect(updatedAutomation).toBeDefined();
            expect(updatedAutomation.title).toBe("Testing Automation Name Change");
        }));
    });
    describe("Automations deletion", () => {
        it("should delete an automation", () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = yield onvoAutomations.delete(automation.id);
            expect(payload.success).toBe(true);
        }));
    });
});
