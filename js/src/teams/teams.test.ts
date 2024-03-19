import { Onvo } from "../index";

describe("Teams", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  afterAll(() => {
    return onvo.teams.update("3d05b990-c855-4945-bdd1-b3a8305ffc59", {
      name: "Testing team",
    });
  });

  it("should list teams", async () => {
    const accounts = await onvo.teams.list();
    expect(accounts).toBeDefined();
    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts[0].id).toBeDefined();
    expect(accounts[0].name).toBeDefined();
    expect(accounts[0].logo).toBeDefined();
    expect(accounts[0].phone_number).toBeDefined();
    expect(accounts[0].email).toBeDefined();
  });

  it("should get a team", async () => {
    const account = await onvo.teams.get(
      "3d05b990-c855-4945-bdd1-b3a8305ffc59"
    );
    expect(account.id).toBeDefined();
    expect(account.name).toBeDefined();
    expect(account.logo).toBeDefined();
    expect(account.phone_number).toBeDefined();
    expect(account.email).toBeDefined();
  });

  it("should update a team", async () => {
    const account = await onvo.teams.update(
      "3d05b990-c855-4945-bdd1-b3a8305ffc59",
      {
        name: "In test",
      }
    );
    expect(account.name).toEqual("In test");
  });
});
