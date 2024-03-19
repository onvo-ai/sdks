import { DataSource, Onvo } from "../index";

describe("Datasources", () => {
  let onvo: Onvo;
  let newDatasource: DataSource;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should create a datasource", async () => {
    newDatasource = await onvo.datasources.create({
      title: "Automation test",
      description: "",
      source: "csv",
      config: JSON.stringify({
        url: "1234567890",
        filename: "Test file",
      }),
      columns: [],
      parameters: JSON.stringify({}),
    });
    expect(newDatasource).toBeDefined();
    expect(newDatasource.id).toBeDefined();
    expect(newDatasource.title).toBeDefined();
    expect(newDatasource.source).toBeDefined();
    expect(newDatasource.config).toBeDefined();
  }, 15000);

  it("should list datasources", async () => {
    const automations = await onvo.datasources.list();
    expect(automations).toBeDefined();
    expect(automations.length).toBeGreaterThan(0);
    expect(automations[0].id).toBeDefined();
    expect(automations[0].title).toBeDefined();
    expect(automations[0].source).toBeDefined();
    expect(automations[0].config).toBeDefined();
  });

  it("should get a datasource", async () => {
    const automation = await onvo.datasources.get(newDatasource.id);
    expect(automation.id).toBeDefined();
    expect(automation.title).toBeDefined();
    expect(automation.source).toBeDefined();
    expect(automation.config).toBeDefined();
  });

  it("should update a datasource", async () => {
    const automation = await onvo.datasources.update(newDatasource.id, {
      title: "Automation test",
    });
    expect(automation.title).toEqual("Automation test");
  });

  it("should delete a datasource", async () => {
    const response = await onvo.datasources.delete(newDatasource.id);
    expect(response.success).toEqual(true);
  });
});
