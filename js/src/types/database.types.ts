export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          phone_number: string | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          phone_number?: string | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          phone_number?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      api_keys: {
        Row: {
          created_at: string | null;
          hash: string;
          id: string;
          last_used_at: string | null;
          prefix: string;
          scopes: string[];
          suffix: string;
          team: string;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          hash: string;
          id?: string;
          last_used_at?: string | null;
          prefix: string;
          scopes?: string[];
          suffix: string;
          team: string;
          title: string;
        };
        Update: {
          created_at?: string | null;
          hash?: string;
          id?: string;
          last_used_at?: string | null;
          prefix?: string;
          scopes?: string[];
          suffix?: string;
          team?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "api_keys_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      automation_runs: {
        Row: {
          automation: string;
          id: string;
          recipient_emails: string[] | null;
          run_at: string;
          status: string;
          team: string;
        };
        Insert: {
          automation: string;
          id?: string;
          recipient_emails?: string[] | null;
          run_at?: string;
          status: string;
          team: string;
        };
        Update: {
          automation?: string;
          id?: string;
          recipient_emails?: string[] | null;
          run_at?: string;
          status?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "automation_runs_automation_fkey";
            columns: ["automation"];
            isOneToOne: false;
            referencedRelation: "automations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automation_runs_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      automations: {
        Row: {
          created_at: string;
          created_by: string;
          dashboard: string;
          description: string | null;
          email_format: string;
          email_subject: string;
          enabled: boolean;
          id: string;
          last_run_at: string | null;
          last_updated_at: string;
          last_updated_by: string | null;
          next_run_at: string | null;
          output_format: string;
          recipient_type: string;
          recipients: string[] | null;
          schedule: string;
          team: string;
          timezone: string;
          title: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          dashboard: string;
          description?: string | null;
          email_format: string;
          email_subject: string;
          enabled?: boolean;
          id?: string;
          last_run_at?: string | null;
          last_updated_at?: string;
          last_updated_by?: string | null;
          next_run_at?: string | null;
          output_format: string;
          recipient_type: string;
          recipients?: string[] | null;
          schedule: string;
          team: string;
          timezone?: string;
          title: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          dashboard?: string;
          description?: string | null;
          email_format?: string;
          email_subject?: string;
          enabled?: boolean;
          id?: string;
          last_run_at?: string | null;
          last_updated_at?: string;
          last_updated_by?: string | null;
          next_run_at?: string | null;
          output_format?: string;
          recipient_type?: string;
          recipients?: string[] | null;
          schedule?: string;
          team?: string;
          timezone?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "automations_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automations_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automations_last_updated_by_fkey";
            columns: ["last_updated_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "automations_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      dashboard_datasources: {
        Row: {
          dashboard: string;
          datasource: string;
          team: string;
        };
        Insert: {
          dashboard: string;
          datasource: string;
          team: string;
        };
        Update: {
          dashboard?: string;
          datasource?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dashboard_datasources_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dashboard_datasources_datasource_fkey";
            columns: ["datasource"];
            isOneToOne: false;
            referencedRelation: "datasources";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dashboard_datasources_datasource_fkey";
            columns: ["datasource"];
            isOneToOne: false;
            referencedRelation: "decrypted_datasources";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dashboard_datasources_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      dashboards: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string | null;
          filters: Json;
          id: string;
          last_updated_at: string;
          last_updated_by: string | null;
          parent_dashboard: string | null;
          settings: Json;
          team: string;
          thumbnail: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          filters?: Json;
          id?: string;
          last_updated_at?: string;
          last_updated_by?: string | null;
          parent_dashboard?: string | null;
          settings?: Json;
          team: string;
          thumbnail?: string | null;
          title: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string | null;
          filters?: Json;
          id?: string;
          last_updated_at?: string;
          last_updated_by?: string | null;
          parent_dashboard?: string | null;
          settings?: Json;
          team?: string;
          thumbnail?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dashboards_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dashboards_last_updated_by_fkey";
            columns: ["last_updated_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dashboards_parent_dashboard_fkey";
            columns: ["parent_dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dashboards_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      datasources: {
        Row: {
          columns: Json | null;
          config: string | null;
          created_at: string;
          created_by: string | null;
          description: string;
          filters: Json;
          id: string;
          last_updated_at: string;
          last_updated_by: string | null;
          parameters: string | null;
          sample_data: string | null;
          size: number;
          source: string;
          team: string;
          title: string;
        };
        Insert: {
          columns?: Json | null;
          config?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string;
          filters?: Json;
          id?: string;
          last_updated_at?: string;
          last_updated_by?: string | null;
          parameters?: string | null;
          sample_data?: string | null;
          size?: number;
          source: string;
          team: string;
          title: string;
        };
        Update: {
          columns?: Json | null;
          config?: string | null;
          created_at?: string;
          created_by?: string | null;
          description?: string;
          filters?: Json;
          id?: string;
          last_updated_at?: string;
          last_updated_by?: string | null;
          parameters?: string | null;
          sample_data?: string | null;
          size?: number;
          source?: string;
          team?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "datasources_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "datasources_last_updated_by_fkey";
            columns: ["last_updated_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "datasources_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      embed_users: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          last_updated_at: string;
          metadata: Json | null;
          name: string;
          team: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          last_updated_at?: string;
          metadata?: Json | null;
          name: string;
          team: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          last_updated_at?: string;
          metadata?: Json | null;
          name?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organisation_users_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      integrations: {
        Row: {
          config: string;
          created_at: string;
          provider: string;
          team: string;
        };
        Insert: {
          config: string;
          created_at?: string;
          provider: string;
          team: string;
        };
        Update: {
          config?: string;
          created_at?: string;
          provider?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "integrations_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      invites: {
        Row: {
          created_at: string;
          email: string;
          name: string;
          team: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          name: string;
          team: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          name?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invites_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      logs: {
        Row: {
          cost: number | null;
          created_at: string;
          id: string;
          messages: Json | null;
          model: string;
          success: boolean | null;
          team: string;
          tokens: number | null;
          type: string;
        };
        Insert: {
          cost?: number | null;
          created_at?: string;
          id?: string;
          messages?: Json | null;
          model: string;
          success?: boolean | null;
          team: string;
          tokens?: number | null;
          type: string;
        };
        Update: {
          cost?: number | null;
          created_at?: string;
          id?: string;
          messages?: Json | null;
          model?: string;
          success?: boolean | null;
          team?: string;
          tokens?: number | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "logs_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      members: {
        Row: {
          account: string;
          team: string;
        };
        Insert: {
          account: string;
          team: string;
        };
        Update: {
          account?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "members_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "members_user_fkey";
            columns: ["account"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          }
        ];
      };
      questions: {
        Row: {
          created_at: string;
          dashboard: string;
          id: string;
          messages: Json;
          query: string;
          team: string | null;
        };
        Insert: {
          created_at?: string;
          dashboard: string;
          id?: string;
          messages?: Json;
          query: string;
          team?: string | null;
        };
        Update: {
          created_at?: string;
          dashboard?: string;
          id?: string;
          messages?: Json;
          query?: string;
          team?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "questions_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      sessions: {
        Row: {
          created_at: string;
          dashboard: string;
          embed_user: string;
          parameters: string;
          team: string;
        };
        Insert: {
          created_at?: string;
          dashboard: string;
          embed_user: string;
          parameters?: string;
          team: string;
        };
        Update: {
          created_at?: string;
          dashboard?: string;
          embed_user?: string;
          parameters?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_embed_user_fkey";
            columns: ["embed_user", "team"];
            isOneToOne: false;
            referencedRelation: "embed_users";
            referencedColumns: ["id", "team"];
          }
        ];
      };
      subscription_plans: {
        Row: {
          automations: boolean;
          integrations: boolean;
          name: string;
          users: number | null;
          widgets: number;
        };
        Insert: {
          automations?: boolean;
          integrations?: boolean;
          name: string;
          users?: number | null;
          widgets?: number;
        };
        Update: {
          automations?: boolean;
          integrations?: boolean;
          name?: string;
          users?: number | null;
          widgets?: number;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          interval: string;
          period_end: string;
          period_start: string;
          product_name: string;
          stripe_customer_id: string;
          stripe_product_id: string;
          stripe_subscription_id: string;
          team: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency: string;
          interval: string;
          period_end: string;
          period_start?: string;
          product_name: string;
          stripe_customer_id: string;
          stripe_product_id: string;
          stripe_subscription_id: string;
          team: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          interval?: string;
          period_end?: string;
          period_start?: string;
          product_name?: string;
          stripe_customer_id?: string;
          stripe_product_id?: string;
          stripe_subscription_id?: string;
          team?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_product_name_fkey";
            columns: ["product_name"];
            isOneToOne: false;
            referencedRelation: "subscription_plans";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "subscriptions_team_fkey";
            columns: ["team"];
            isOneToOne: true;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      teams: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
          logo: string | null;
          name: string | null;
          phone_number: string | null;
          stripe_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          logo?: string | null;
          name?: string | null;
          phone_number?: string | null;
          stripe_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
          logo?: string | null;
          name?: string | null;
          phone_number?: string | null;
          stripe_id?: string | null;
        };
        Relationships: [];
      };
      widgets: {
        Row: {
          cache: string | null;
          code: string;
          created_at: string;
          dashboard: string;
          id: string;
          layouts: Json;
          messages: Json;
          settings: Json;
          team: string;
          title: string;
        };
        Insert: {
          cache?: string | null;
          code: string;
          created_at?: string;
          dashboard: string;
          id?: string;
          layouts?: Json;
          messages?: Json;
          settings?: Json;
          team: string;
          title: string;
        };
        Update: {
          cache?: string | null;
          code?: string;
          created_at?: string;
          dashboard?: string;
          id?: string;
          layouts?: Json;
          messages?: Json;
          settings?: Json;
          team?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "widgets_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "widgets_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      decrypted_datasources: {
        Row: {
          columns: Json | null;
          config: string | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          filters: Json | null;
          id: string | null;
          last_updated_at: string | null;
          last_updated_by: string | null;
          parameters: string | null;
          sample_data: string | null;
          size: number | null;
          source: string | null;
          team: string | null;
          title: string | null;
        };
        Insert: {
          columns?: Json | null;
          config?: never;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          filters?: Json | null;
          id?: string | null;
          last_updated_at?: string | null;
          last_updated_by?: string | null;
          parameters?: never;
          sample_data?: never;
          size?: number | null;
          source?: string | null;
          team?: string | null;
          title?: string | null;
        };
        Update: {
          columns?: Json | null;
          config?: never;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          filters?: Json | null;
          id?: string | null;
          last_updated_at?: string | null;
          last_updated_by?: string | null;
          parameters?: never;
          sample_data?: never;
          size?: number | null;
          source?: string | null;
          team?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "datasources_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "datasources_last_updated_by_fkey";
            columns: ["last_updated_by"];
            isOneToOne: false;
            referencedRelation: "accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "datasources_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      decrypted_integrations: {
        Row: {
          config: string | null;
          created_at: string | null;
          provider: string | null;
          team: string | null;
        };
        Insert: {
          config?: never;
          created_at?: string | null;
          provider?: string | null;
          team?: string | null;
        };
        Update: {
          config?: never;
          created_at?: string | null;
          provider?: string | null;
          team?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "integrations_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
      decrypted_sessions: {
        Row: {
          created_at: string | null;
          dashboard: string | null;
          embed_user: string | null;
          parameters: string | null;
          team: string | null;
        };
        Insert: {
          created_at?: string | null;
          dashboard?: string | null;
          embed_user?: string | null;
          parameters?: never;
          team?: string | null;
        };
        Update: {
          created_at?: string | null;
          dashboard?: string | null;
          embed_user?: string | null;
          parameters?: never;
          team?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sessions_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sessions_embed_user_fkey";
            columns: ["embed_user", "team"];
            isOneToOne: false;
            referencedRelation: "embed_users";
            referencedColumns: ["id", "team"];
          }
        ];
      };
      decrypted_widgets: {
        Row: {
          cache: string | null;
          code: string | null;
          created_at: string | null;
          dashboard: string | null;
          id: string | null;
          layouts: Json | null;
          messages: Json | null;
          settings: Json | null;
          team: string | null;
          title: string | null;
        };
        Insert: {
          cache?: never;
          code?: string | null;
          created_at?: string | null;
          dashboard?: string | null;
          id?: string | null;
          layouts?: Json | null;
          messages?: Json | null;
          settings?: Json | null;
          team?: string | null;
          title?: string | null;
        };
        Update: {
          cache?: never;
          code?: string | null;
          created_at?: string | null;
          dashboard?: string | null;
          id?: string | null;
          layouts?: Json | null;
          messages?: Json | null;
          settings?: Json | null;
          team?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "widgets_dashboard_fkey";
            columns: ["dashboard"];
            isOneToOne: false;
            referencedRelation: "dashboards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "widgets_team_fkey";
            columns: ["team"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Functions: {
      can_create_widget: {
        Args: {
          p_auth: Json;
        };
        Returns: boolean;
      };
      check_id_in_dashboards: {
        Args: {
          id: string;
          json_data: Json;
        };
        Returns: boolean;
      };
      string_to_uuid_array: {
        Args: {
          input_string: string;
        };
        Returns: string[];
      };
      stripe_can_create_automation: {
        Args: {
          organisation: string;
        };
        Returns: boolean;
      };
      stripe_can_create_datasource: {
        Args: {
          organisation: string;
          type: string;
        };
        Returns: boolean;
      };
      stripe_can_create_invite: {
        Args: {
          organisation: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
