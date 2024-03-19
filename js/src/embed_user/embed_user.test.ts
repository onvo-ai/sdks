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

  it("should fetch token", async () => {
    const token = await onvo.embed_user("123456").getAccessToken();
    expect(token).toBeDefined();
    expect(token.user).toBeDefined();
    expect(token.token).toBeDefined();
    expect(token.user).toEqual("123456");
  });
});
