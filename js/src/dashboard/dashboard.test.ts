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

  it("should get dashboard pdf", async () => {
    let response = await onvo
      .dashboard("f90182a2-f485-45a8-a9d6-b72021c03b50")
      .export("pdf");

    expect(response).toBeDefined();
  }, 30000);
  it("should update widget cache", async () => {
    let widgets = await onvo
      .dashboard("f90182a2-f485-45a8-a9d6-b72021c03b50")
      .updateWidgetCache();

    expect(widgets).toBeDefined();
    expect(widgets.length).toBeDefined();
    expect(widgets.length).toBeGreaterThan(0);
  }, 60000);
});
