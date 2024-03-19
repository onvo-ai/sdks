import { Onvo } from "../index";

describe("Dashboard Datasources", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should link dashboard datasource", async () => {
    let response = await onvo
      .dashboard("42058ac8-a83b-4e26-8b3c-b86a773d052a")
      .datasources.link("5cd7cb43-9d7a-4b7e-9697-9687a9681ad5");

    expect(response).toBeDefined();
    expect(response.dashboard).toBeDefined();
    expect(response.datasource).toBeDefined();
  });
  it("should list dashboard datasources", async () => {
    let datasources = await onvo
      .dashboard("42058ac8-a83b-4e26-8b3c-b86a773d052a")
      .datasources.list();

    expect(datasources).toBeDefined();
    expect(datasources.length).toBeDefined();
    expect(datasources.length).toBeGreaterThan(0);
  });

  it("should unlink dashboard datasource", async () => {
    let response = await onvo
      .dashboard("42058ac8-a83b-4e26-8b3c-b86a773d052a")
      .datasources.unlink("5cd7cb43-9d7a-4b7e-9697-9687a9681ad5");
    expect(response).toBeDefined();
    expect(response.success).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
