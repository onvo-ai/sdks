import { Onvo } from "../index";

describe("Question", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should get widget image", async () => {
    let response = await onvo
      .question("6ec172e6-1bcc-4440-9859-8870a0541bda")
      .export(1, "png");
    expect(response.size).toBeGreaterThan(0);
    expect(response).toBeDefined();
  }, 30000);
});
