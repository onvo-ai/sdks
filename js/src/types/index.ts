import { Database } from "./database.types";
import { Modify } from "./utils";

export * from "./database.types";
export * from "./tables";
export * from "./utils";

export type DashboardSettings = {
  filters: boolean;

  cache_refresh_interval?: number; // in minutes

  theme: "dark" | "light" | "auto";
  font: string;
  dark_background: string;
  dark_foreground: string;
  dark_text: string;
  light_background: string;
  light_foreground: string;
  light_text: string;
  hide_header: boolean;
  grid_spacing: number;
  custom_css: string;

  copilot_title: string;
  copilot_description: string;
  help_url?: string;
  enable_advanced_widget_creator?: boolean;
  enable_widget_insights?: boolean;

  can_ask_questions: boolean;
  can_edit_widgets: boolean; // used to be editable
  can_edit_widget_layout: boolean; // used to be editable
  can_create_widgets: boolean; // used to be editable
  can_delete_widgets: boolean; // used to be editable
  can_schedule_reports?: boolean;
  can_edit_widget_code?: boolean;

  disable_download_images: boolean;
  disable_download_reports: boolean;
  disable_download_documents: boolean;
  pdf_orientation?: "portrait" | "landscape";
};

export type WidgetSettings = {
  disable_download_images: boolean;
  disable_download_reports: boolean;
  title_hidden: boolean;
  css_id?: string;
  css_classnames?: string;
};
export interface DatasourceFilter {
  column: string;
  type: 'text' | 'number' | 'date';
  label: string;
}
export type DashboardFilter = {
  label: string;
  type: "text";
  options: string[];
  values: string[];
} | {
  label: string;
  type: "number";
  options: [number, number];
  values: [number, number];
} | {
  label: string;
  type: "date";
  options: [string, string];
  values: [string, string];
};

export type WidgetMessage = {
  role: "user" | "assistant";
  content: string;
};
export interface DashboardMeta {
  created_by: Account;
  last_updated_by?: Account;
  widgets: number;
  datasources: number;
}
export type Invite = Database["public"]["Tables"]["invites"]["Row"];
export type Member = Database["public"]["Tables"]["members"]["Row"];
export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type DataSource = Modify<
  Database["public"]["Tables"]["datasources"]["Row"],
  {
    columns: { title: string; description: string }[];
    sample_data: { [key: string]: any }[];
    config: any;
    parameters: { id: string; wrap?: string; default: string }[];
    filters: DatasourceFilter[];
  }
>;
export type EmbedUser = Database["public"]["Tables"]["embed_users"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type SubscriptionPlan =
  Database["public"]["Tables"]["subscription_plans"]["Row"];
export type APIKey = Database["public"]["Tables"]["api_keys"]["Row"];
export type Widget = Modify<
  Database["public"]["Tables"]["widgets"]["Row"],
  {
    settings?: WidgetSettings;
    messages: WidgetMessage[];
    layouts: {
      lg: { x: number; y: number; w: number; h: number };
      sm?: { x: number; y: number; w: number; h: number };
    };
    cache: any;
  }
>;
export type Dashboard = Modify<
  Database["public"]["Tables"]["dashboards"]["Row"],
  {
    settings?: DashboardSettings;
    filters: DashboardFilter[];
  }
>;
export type DashboardDatasource =
  Database["public"]["Tables"]["dashboard_datasources"]["Row"];
export type Session = Modify<
  Database["public"]["Tables"]["sessions"]["Row"],
  {
    parameters: { [key: string]: any };
  }
>;

export type Question = Database["public"]["Tables"]["questions"]["Row"];

export type Integration = Modify<
  Database["public"]["Tables"]["integrations"]["Row"],
  {
    config: any;
  }
>;
export type Automation = Database["public"]["Tables"]["automations"]["Row"];
export type AutomationRun =
  Database["public"]["Tables"]["automation_runs"]["Row"];

export type LLMSettings = Database["public"]["Tables"]["llm_settings"]["Row"];

export type Log = Database["public"]["Tables"]["logs"]["Row"];

export enum LogType {
  ViewDashboard = "view-dashboard",
  EditDashboard = "edit-dashboard",
  CreateWidget = "create-widget",
  DeleteWidget = "delete-widget",
  EditWidget = "edit-widget",
}