import { Onvo } from "../index";

describe("Dashboard Datasources", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should link dashboard datasource", async () => {
    let response = await onvo
      .dashboard("f90182a2-f485-45a8-a9d6-b72021c03b50")
      .datasources.link("5cd7cb43-9d7a-4b7e-9697-9687a9681ad5");

    expect(response).toBeDefined();
    expect(response.dashboard).toBeDefined();
    expect(response.datasource).toBeDefined();
  });
  it("should list dashboard datasources", async () => {
    let datasources = await onvo
      .dashboard("f90182a2-f485-45a8-a9d6-b72021c03b50")
      .datasources.list();

    expect(datasources).toBeDefined();
    expect(datasources.length).toBeDefined();
    expect(datasources.length).toBeGreaterThan(0);
  });

  it("should unlink dashboard datasource", async () => {
    let response = await onvo
      .dashboard("f90182a2-f485-45a8-a9d6-b72021c03b50")
      .datasources.unlink("5cd7cb43-9d7a-4b7e-9697-9687a9681ad5");
    expect(response).toBeDefined();
    expect(response.success).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
