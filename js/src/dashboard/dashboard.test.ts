import { Onvo } from "../index";

describe("Dashboard", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should update widget cache", async () => {
    let widgets = await onvo
      .dashboard("42058ac8-a83b-4e26-8b3c-b86a773d052a")
      .updateWidgetCache();

    expect(widgets).toBeDefined();
    expect(widgets.length).toBeDefined();
    expect(widgets.length).toBeGreaterThan(0);
  }, 60000);
  it("should get widget suggestions", async () => {
    let suggestions = await onvo
      .dashboard("42058ac8-a83b-4e26-8b3c-b86a773d052a")
      .getWidgetSuggestions();

    expect(suggestions).toBeDefined();
    expect(suggestions.length).toBeDefined();
    expect(suggestions.length).toBeGreaterThan(0);
  }, 30000);
});
