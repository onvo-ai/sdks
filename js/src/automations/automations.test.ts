import { Automation } from "../types";
import { OnvoAutomations } from "./index";

describe("Automations", () => {
  let onvoAutomations: OnvoAutomations;
  let automation: Automation;

  beforeEach(() => {
    onvoAutomations = new OnvoAutomations(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  describe("Automations creation", () => {
    it("should create an automation", async () => {
      automation = await onvoAutomations.create({
        created_at: new Date().toISOString(),
        last_updated_at: new Date().toISOString(),
        created_by: "1bda55a1-ae08-42e4-a27b-f1a122356789",
        last_updated_by: "1bda55a1-ae08-42e4-a27b-f1a122356789",
        enabled: false,
        team: "1bda55a1-ae08-42e4-a27b-f1a122356789",

        title: "Testing Automation",
        description: "",

        dashboard: "a3cc7494-2763-4620-9b0f-b4230b99dce4",
        output_format: "link",

        schedule: "",
        recipient_type: "internal",
        recipients: [],

        email_format:
          "Hello {{name}}, &#10;Here is your automated email from Onvo AI.<br />You can find the dashboard below:<br />{{link}}",
        email_subject: "Automated email from Onvo AI",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      expect(automation).toBeDefined();
    });
  });

  describe("Automations creation", () => {
    it("should list automations", async () => {
      const automations = await onvoAutomations.list();
      expect(automations).toBeDefined();
      expect(automations.length).toBeGreaterThan(0);
    });

    it("should get an automation", async () => {
      const fetchedAutomation = await onvoAutomations.get(automation.id);
      expect(fetchedAutomation).toBeDefined();
      expect(fetchedAutomation.id).toBe(automation.id);
    });

    it("should update an automation", async () => {
      const updatedAutomation = await onvoAutomations.update(automation.id, {
        title: "Testing Automation Name Change",
      });
      expect(updatedAutomation).toBeDefined();
      expect(updatedAutomation.title).toBe("Testing Automation Name Change");
    });
  });

  describe("Automations deletion", () => {
    it("should delete an automation", async () => {
      const payload = await onvoAutomations.delete(automation.id);
      expect(payload.success).toBe(true);
    });
  });
});
