import { Onvo } from "../index";

describe("Accounts", () => {
  let onvo: Onvo;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should list accounts", async () => {
    const accounts = await onvo.accounts.list();
    expect(accounts).toBeDefined();
    expect(accounts.length).toBeGreaterThan(0);
    expect(accounts[0].id).toBeDefined();
    expect(accounts[0].full_name).toBeDefined();
    expect(accounts[0].avatar_url).toBeDefined();
    expect(accounts[0].updated_at).toBeDefined();
    expect(accounts[0].email).toBeDefined();
  });

  it("should get an account", async () => {
    const account = await onvo.accounts.get(
      "1bda55a1-ae08-42e4-a27b-f1a122356789"
    );
    expect(account.id).toBeDefined();
    expect(account.full_name).toBeDefined();
    expect(account.avatar_url).toBeDefined();
    expect(account.updated_at).toBeDefined();
    expect(account.email).toBeDefined();
  });
});
