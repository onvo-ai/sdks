import { Dashboard, Onvo } from "../index";

describe("Dashboards", () => {
  let onvo: Onvo;
  let newDashboard: Dashboard;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJkYXNoYm9hcmRzIjpbImY5MDE4MmEyLWY0ODUtNDVhOC1hOWQ2LWI3MjAyMWMwM2I1MCJdLCJwYXJlbnRfdGVhbSI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSJ9LCJzdWIiOiIzZDA1Yjk5MC1jODU1LTQ5NDUtYmRkMS1iM2E4MzA1ZmZjNTktMWJkYTU1YTEtYWUwOC00MmU0LWEyN2ItZjFhMTIyMzU2Nzg5IiwiYXVkIjoiYXV0aGVudGljYXRlZCIsImlhdCI6MTcxMDgzMjIzN30.XF0vj7agTWTkWNduDmmdnr5gH8MdomU4ZAQwcfM2Xu8",
      {
        endpoint: "https://staging.onvo.ai",
      }
    );
  });

  it("should create dashboard", async () => {
    newDashboard = await onvo.dashboards.create({
      title: "My Dashboard",
      description: "This is my dashboard",
      parent_dashboard: null,
      settings: undefined,
    });

    expect(newDashboard).toBeDefined();
    expect(newDashboard.id).toBeDefined();
    expect(newDashboard.title).toBeDefined();
    expect(newDashboard.description).toBeDefined();
    expect(newDashboard.team).toBeDefined();
  }, 10000);
  it("should list dashboards", async () => {
    let dashboards = await onvo.dashboards.list();

    expect(dashboards).toBeDefined();
    expect(dashboards.length).toBeDefined();
    expect(dashboards.length).toBeGreaterThan(0);
  });

  it("should get dashboard", async () => {
    let dashboard = await onvo.dashboards.get(newDashboard.id);

    expect(dashboard).toBeDefined();
    expect(dashboard.id).toBeDefined();
    expect(dashboard.id).toEqual(newDashboard.id);
    expect(dashboard.title).toBeDefined();
  });

  it("should update dashboard", async () => {
    let dashboard = await onvo.dashboards.update(newDashboard.id, {
      title: "Automation test",
    });

    expect(dashboard).toBeDefined();
    expect(dashboard.id).toBeDefined();
    expect(dashboard.title).toBeDefined();
    expect(dashboard.title).toEqual("Automation test");
  });

  it("should delete dashboard", async () => {
    let response = await onvo.dashboards.delete(newDashboard.id);

    expect(response).toBeDefined();
    expect(response.success).toEqual(true);
  });
});
