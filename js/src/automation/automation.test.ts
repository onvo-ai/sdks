import { Onvo } from "../index";

describe("Automation", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should list automation runs", async () => {
    let automation = await onvo.automations.create({
      created_at: new Date().toISOString(),
      last_updated_at: new Date().toISOString(),
      created_by: "1bda55a1-ae08-42e4-a27b-f1a122356789",
      last_updated_by: "1bda55a1-ae08-42e4-a27b-f1a122356789",
      enabled: false,
      team: "1bda55a1-ae08-42e4-a27b-f1a122356789",

      title: "Testing Automation",
      description: "",

      dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
      output_format: "link",

      schedule: "",
      recipient_type: "internal",
      recipients: [],

      email_format:
        "Hello {{name}}, &#10;Here is your automated email from Onvo AI.<br />You can find the dashboard below:<br />{{link}}",
      email_subject: "Automated email from Onvo AI",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    const testAutomation = await onvo.automation(automation.id).getRuns();
    expect(testAutomation).toBeDefined();
    expect(testAutomation).toEqual([]);
    expect(testAutomation.length).toEqual(0);
  }, 10000);
});
