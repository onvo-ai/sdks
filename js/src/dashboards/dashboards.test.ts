import { Dashboard, Onvo } from "../index";

describe("Dashboards", () => {
  let onvo: Onvo;
  let newDashboard: Dashboard;

  beforeEach(() => {
    onvo = new Onvo(
      "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFwcF9tZXRhZGF0YSI6eyJ0ZWFtIjoiM2QwNWI5OTAtYzg1NS00OTQ1LWJkZDEtYjNhODMwNWZmYzU5In0sInN1YiI6IjNkMDViOTkwLWM4NTUtNDk0NS1iZGQxLWIzYTgzMDVmZmM1OSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJpYXQiOjE3MDc0ODU5MTZ9.VxHmDH_CgaJTbIFL1ysxc_PFXN6cMgS1ampyJLs4A7k",
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
      filters: [],
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
