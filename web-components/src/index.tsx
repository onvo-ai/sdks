import { DashboardListWC } from "./DashboardList";
import { DashboardWC } from "./Dashboard";
import { CopilotWC } from "./Copilot";

customElements.define("onvo-dashboard-list", DashboardListWC);
customElements.define("onvo-dashboard", DashboardWC);
customElements.define("onvo-copilot", CopilotWC);

export const Dashboard = DashboardWC;
export const DashboardList = DashboardListWC;
export const Copilot = CopilotWC;
