import { Onvo } from "../index";

describe("Dashboard", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
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
