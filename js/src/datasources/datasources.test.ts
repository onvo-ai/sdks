import { DataSource, Onvo } from "../index";

describe("Datasources", () => {
  let onvo: Onvo;
  let newDatasource: DataSource;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
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
      filters: [],
      config: {
        url: "1234567890",
        filename: "Test file",
      },
      columns: [],
      parameters: [],
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
