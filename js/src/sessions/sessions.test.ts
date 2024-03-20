import { Onvo, Session } from "../index";

describe("Sessions", () => {
  let onvo: Onvo;
  let newSession: Session;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should upsert session", async () => {
    newSession = await onvo.sessions.upsert({
      embed_user: "123456",
      parent_dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
      parameters: {},
    });

    expect(newSession).toBeDefined();
    expect(newSession.dashboard).toBeDefined();
    expect(newSession.embed_user).toBeDefined();
  }, 60000);

  it("should list sessions", async () => {
    let sessions = await onvo.sessions.list({
      parent_dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
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
      parent_dashboard: "f90182a2-f485-45a8-a9d6-b72021c03b50",
    });

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
