import { Automation } from "../types";
import { Onvo } from "../index";

describe("Automations", () => {
  let onvo: Onvo;
  let automation: Automation;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  describe("Automations creation", () => {
    it("should create an automation", async () => {
      automation = await onvo.automations.create({
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

        email_format:
          "Hello {{name}}, &#10;Here is your automated email from Onvo AI.<br />You can find the dashboard below:<br />{{link}}",
        email_subject: "Automated email from Onvo AI",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      expect(automation).toBeDefined();
    }, 10000);
  });

  describe("Automations fetching", () => {
    it("should list automations", async () => {
      const automations = await onvo.automations.list();
      expect(automations).toBeDefined();
      expect(automations.length).toBeGreaterThan(0);
    });

    it("should get an automation", async () => {
      const fetchedAutomation = await onvo.automations.get(automation.id);
      expect(fetchedAutomation).toBeDefined();
      expect(fetchedAutomation.id).toBe(automation.id);
    });

    it("should update an automation", async () => {
      const updatedAutomation = await onvo.automations.update(automation.id, {
        title: "Testing Automation Name Change",
      });
      expect(updatedAutomation).toBeDefined();
      expect(updatedAutomation.title).toBe("Testing Automation Name Change");
    });
  });

  describe("Automations deletion", () => {
    it("should delete an automation", async () => {
      const payload = await onvo.automations.delete(automation.id);
      expect(payload.success).toBe(true);
    });
  });
});
