import { Onvo, Session } from "../index";

describe("Sessions", () => {
  let onvo: Onvo;
  let newSession: Session;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should upsert session", async () => {
    newSession = await onvo.sessions.upsert({
      embed_user: "123456",
      parent_dashboard: "42058ac8-a83b-4e26-8b3c-b86a773d052a",
      parameters: {},
    });

    expect(newSession).toBeDefined();
    expect(newSession.dashboard).toBeDefined();
    expect(newSession.embed_user).toBeDefined();
  }, 60000);

  it("should list sessions", async () => {
    let sessions = await onvo.sessions.list({
      parent_dashboard: "42058ac8-a83b-4e26-8b3c-b86a773d052a",
    });

    expect(sessions).toBeDefined();
    expect(sessions.length).toBeDefined();
    expect(sessions.length).toBeGreaterThan(0);
  });
  it("should get session", async () => {
    let session = await onvo.sessions.get({
      dashboard: newSession.dashboard,
    });

    expect(session).toBeDefined();
    expect(session.dashboard).toBeDefined();
    expect(session.dashboard).toEqual(newSession.dashboard);
    expect(session.embed_user).toBeDefined();
    expect(session.embed_user).toEqual(newSession.embed_user);
  });

  it("should revoke session", async () => {
    let response = await onvo.sessions.revoke({
      dashboard: newSession.dashboard,
    });

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });

  it("should revoke all sessions", async () => {
    let response = await onvo.sessions.revokeAll({
      parent_dashboard: "42058ac8-a83b-4e26-8b3c-b86a773d052a",
    });

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
