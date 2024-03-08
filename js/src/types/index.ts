import { Database } from "./database.types";
import { Modify } from "./utils";

export * from "./database.types";
export * from "./tables";
export * from "./datasources";
export * from "./utils";

export type Settings = {
  theme: "dark" | "light" | "auto";
  dark_background: string;
  dark_foreground: string;
  light_background: string;
  light_foreground: string;
  border_radius: number;
  font: string;
  editable: boolean;
  can_ask_questions: boolean;
  hide_header: boolean;
};
export type Invite = Database["public"]["Tables"]["invites"]["Row"];
export type Member = Database["public"]["Tables"]["members"]["Row"];
export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type DataSource = Modify<
  Database["public"]["Tables"]["datasources"]["Row"],
  {
    columns: { title: string; description: string }[];
  }
>;
export type EmbedUser = Database["public"]["Tables"]["embed_users"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type SubscriptionPlan =
  Database["public"]["Tables"]["subscription_plans"]["Row"];
export type APIKey = Database["public"]["Tables"]["api_keys"]["Row"];
export type Widget = Database["public"]["Tables"]["widgets"]["Row"];
export type Dashboard = Modify<
  Database["public"]["Tables"]["dashboards"]["Row"],
  {
    settings?: Settings;
  }
>;
export type DashboardDatasource =
  Database["public"]["Tables"]["dashboard_datasources"]["Row"];
export type Session = Database["public"]["Tables"]["sessions"]["Row"];

export type Question = Database["public"]["Tables"]["questions"]["Row"];

export type Integration = Database["public"]["Tables"]["integrations"]["Row"];
export type Automation = Database["public"]["Tables"]["automations"]["Row"];
export type AutomationRun =
  Database["public"]["Tables"]["automation_runs"]["Row"];

export type ComprehensiveDashboard = Dashboard & {
  datasources: DataSource[];
  widgets: Widget[];
};

export type Log = Database["public"]["Tables"]["logs"]["Row"];
