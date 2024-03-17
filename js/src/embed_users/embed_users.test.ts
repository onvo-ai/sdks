import { EmbedUser, Onvo } from "../index";

describe("Embed Users", () => {
  let onvo: Onvo;
  let newUser: EmbedUser;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should list embed users", async () => {
    let embed_users = await onvo.embed_users.list();

    expect(embed_users).toBeDefined();
    expect(embed_users.length).toBeDefined();
    expect(embed_users.length).toBeGreaterThan(0);
  });
  it("should upsert embed user", async () => {
    newUser = await onvo.embed_users.upsert("123456789", {
      name: "Test user",
      email: "test@example.com",
      metadata: {},
    });

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
  });

  it("should get embed user", async () => {
    let user = await onvo.embed_users.get("123456789");
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
  });

  it("should delete embed user", async () => {
    let response = await onvo.embed_users.delete(newUser.id);

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
