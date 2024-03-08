import { OnvoEmbedUser } from "./index";

describe("Accounts", () => {
  let embedUser: OnvoEmbedUser;

  beforeEach(() => {
    embedUser = new OnvoEmbedUser(
      "123456",
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should fetch token", async () => {
    const token = await embedUser.getAccessToken();
    expect(token).toBeDefined();
    expect(token.user).toBeDefined();
    expect(token.token).toBeDefined();
    expect(token.user).toEqual("123456");
  });
});
