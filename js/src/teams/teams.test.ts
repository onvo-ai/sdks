import { OnvoTeams } from "./index";

describe("Teams", () => {
  let onvoTeams: OnvoTeams;

  beforeEach(() => {
    onvoTeams = new OnvoTeams(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  afterAll(() => {
    return onvoTeams.update("3d05b990-c855-4945-bdd1-b3a8305ffc59", {
      name: "Testing team",
    });
  });

  it("should list teams", async () => {
    const accounts = await onvoTeams.list();
    expect(accounts).toBeDefined();
    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts[0].id).toBeDefined();
    expect(accounts[0].name).toBeDefined();
    expect(accounts[0].logo).toBeDefined();
    expect(accounts[0].phone_number).toBeDefined();
    expect(accounts[0].email).toBeDefined();
  });

  it("should get a team", async () => {
    const account = await onvoTeams.get("3d05b990-c855-4945-bdd1-b3a8305ffc59");
    expect(account.id).toBeDefined();
    expect(account.name).toBeDefined();
    expect(account.logo).toBeDefined();
    expect(account.phone_number).toBeDefined();
    expect(account.email).toBeDefined();
  });

  it("should update a team", async () => {
    const account = await onvoTeams.update(
      "3d05b990-c855-4945-bdd1-b3a8305ffc59",
      {
        name: "In test",
      }
    );
    expect(account.name).toEqual("In test");
  });
});
