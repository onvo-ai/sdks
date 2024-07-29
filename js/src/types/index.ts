import { Database } from "./database.types";
import {
  RedshiftDatasourceConfig,
  MySQLDatasourceConfig,
  MsSQLDatasourceConfig,
  PostgreSQLDatasourceConfig,
  RootfiDatasourceConfig,
  MongoDBDatasourceConfig,
  AirtableDatasourceConfig,
  GoogleSheetDatasourceConfig,
  ZohoDatasourceConfig,
  FirestoreDatasourceConfig,
  OauthConfig,
  CSVDatasourceConfig,
  ExcelDatasourceConfig,
  JSONDatasourceConfig,
  APIDatasourceConfig,
} from "./datasources";
import { Modify } from "./utils";

export * from "./database.types";
export * from "./tables";
export * from "./datasources";
export * from "./utils";

export type DashboardSettings = {
  theme: "dark" | "light" | "auto";
  dark_background: string;
  dark_foreground: string;
  dark_text: string;
  light_background: string;
  light_foreground: string;
  light_text: string;
  border_radius: number;
  font: string;
  grid_spacing: number;
  hide_header: boolean;
  custom_css: string;
  filters: boolean;

  can_ask_questions: boolean;
  can_edit_widgets: boolean; // used to be editable
  can_edit_widget_layout: boolean; // used to be editable
  can_create_widgets: boolean; // used to be editable
  can_delete_widgets: boolean; // used to be editable

  disable_download_images: boolean;
  disable_download_reports: boolean;

  help_url?: string;

  enable_advanced_widget_creator?: boolean;
};

export interface DashboardMeta {
  created_by: Account;
  last_updated_by?: Account;
  widgets: number;
  datasources: number;
}

export type WidgetSettings = {
  disable_download_images: boolean;
  disable_download_reports: boolean;
  title_hidden: boolean;
  css_id?: string;
  css_classnames?: string;
};

export type DashboardFilter = {
  title: string;
  type: "picker" | "multi-picker" | "date-picker";
  options: string;
  default: string;
  parameter: string;
};

export type WidgetMessage = {
  role: "user" | "assistant";
  content: string;
};

export type Invite = Database["public"]["Tables"]["invites"]["Row"];
export type Member = Database["public"]["Tables"]["members"]["Row"];
export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type DataSource = Modify<
  Database["public"]["Tables"]["datasources"]["Row"],
  {
    columns: { title: string; description: string }[];
    sample_data: { [key: string]: any }[];
    config:
      | CSVDatasourceConfig
      | ExcelDatasourceConfig
      | JSONDatasourceConfig
      | APIDatasourceConfig
      | AirtableDatasourceConfig
      | GoogleSheetDatasourceConfig
      | ZohoDatasourceConfig
      | RedshiftDatasourceConfig
      | MySQLDatasourceConfig
      | MsSQLDatasourceConfig
      | PostgreSQLDatasourceConfig
      | RootfiDatasourceConfig
      | MongoDBDatasourceConfig
      | FirestoreDatasourceConfig;
    parameters: { id: string; wrap?: string; default: string }[];
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
    config:
      | RedshiftDatasourceConfig
      | MySQLDatasourceConfig
      | MsSQLDatasourceConfig
      | PostgreSQLDatasourceConfig
      | RootfiDatasourceConfig
      | MongoDBDatasourceConfig
      | OauthConfig
      | FirestoreDatasourceConfig;
  }
>;
export type Automation = Database["public"]["Tables"]["automations"]["Row"];
export type AutomationRun =
  Database["public"]["Tables"]["automation_runs"]["Row"];

export type ComprehensiveDashboard = Dashboard & {
  datasources: DataSource[];
  widgets: Widget[];
};
