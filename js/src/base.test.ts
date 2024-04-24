import { Onvo } from "./index";

describe("Base", () => {
  it("should fail to initialize", async () => {
    try {
      // @ts-ignore
      let o = new Onvo();
    } catch (e: any) {
      expect(e).toBeDefined();
      expect(e.message).toBeDefined();
    }
  });

  it("should fail fetchBase", async () => {
    try {
      let onvo = new Onvo(
        "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
        {
          endpoint: "https://staging.onvo.ai",
        }
      );
      await onvo.fetchBase("/api/teams/uksrygdksuyfg");
    } catch (e: any) {
      expect(e).toBeDefined();
      expect(e.message).toBeDefined();
    }
  });
  it("should fail fetchImage", async () => {
    try {
      let onvo = new Onvo(
        "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k"
      );
      await onvo.fetchBlob("hello");
    } catch (e: any) {
      expect(e).toBeDefined();
      expect(e.message).toBeDefined();
    }
  });
});
