import { Onvo } from "../index";
import { File, Blob } from "web-file-polyfill";
describe("Datasource", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should initialize datasource", async () => {
    const datasource = await onvo
      .datasource("f10c95cb-1338-427f-8699-0c5d41258d6e")
      .initialize();
    expect(datasource).toBeDefined();

    expect(datasource.id).toBeDefined();
    expect(datasource.size).toBeDefined();
    expect(datasource.sample_data).toBeDefined();
    expect(datasource.sample_data?.length).toBeGreaterThan(0);
    expect(datasource.columns).toBeDefined();
    expect(datasource.columns.length).toBeGreaterThan(0);
  }, 60000);

  it("should should upload file to datasource", async () => {
    let file = new File([], "hello.csv", {
      type: "text/csv",
    });
    const datasource = await onvo
      .datasource("5cd7cb43-9d7a-4b7e-9697-9687a9681ad5")
      .uploadFile(file);

    expect(datasource).toBeDefined();
    expect(datasource.id).toBeDefined();
    expect(datasource.config).toBeDefined();
  }, 30000);
});
