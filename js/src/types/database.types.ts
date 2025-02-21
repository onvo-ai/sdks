export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          hash: string
          id: string
          last_used_at: string | null
          prefix: string
          scopes: string[]
          suffix: string
          team: string
          title: string
        }
        Insert: {
          created_at?: string | null
          hash: string
          id?: string
          last_used_at?: string | null
          prefix: string
          scopes?: string[]
          suffix: string
          team: string
          title: string
        }
        Update: {
          created_at?: string | null
          hash?: string
          id?: string
          last_used_at?: string | null
          prefix?: string
          scopes?: string[]
          suffix?: string
          team?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_api_keys_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_runs: {
        Row: {
          automation: string
          id: string
          recipient_emails: string[] | null
          run_at: string
          status: string
          team: string
        }
        Insert: {
          automation: string
          id?: string
          recipient_emails?: string[] | null
          run_at?: string
          status: string
          team: string
        }
        Update: {
          automation?: string
          id?: string
          recipient_emails?: string[] | null
          run_at?: string
          status?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_runs_automation_fkey"
            columns: ["automation"]
            isOneToOne: false
            referencedRelation: "automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_automation_runs_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      automations: {
        Row: {
          created_at: string
          dashboard: string
          description: string | null
          email_body: string
          email_cc: string[] | null
          email_subject: string
          email_to: string | null
          enabled: boolean
          id: string
          last_run_at: string | null
          last_updated_at: string
          method: string
          next_run_at: string | null
          output_format: string
          schedule: string
          team: string
          timezone: string
          title: string
        }
        Insert: {
          created_at?: string
          dashboard: string
          description?: string | null
          email_body: string
          email_cc?: string[] | null
          email_subject: string
          email_to?: string | null
          enabled?: boolean
          id?: string
          last_run_at?: string | null
          last_updated_at?: string
          method: string
          next_run_at?: string | null
          output_format: string
          schedule: string
          team: string
          timezone?: string
          title: string
        }
        Update: {
          created_at?: string
          dashboard?: string
          description?: string | null
          email_body?: string
          email_cc?: string[] | null
          email_subject?: string
          email_to?: string | null
          enabled?: boolean
          id?: string
          last_run_at?: string | null
          last_updated_at?: string
          method?: string
          next_run_at?: string | null
          output_format?: string
          schedule?: string
          team?: string
          timezone?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "automations_dashboard_fkey"
            columns: ["dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_automations_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboard_datasources: {
        Row: {
          dashboard: string
          datasource: string
          team: string
        }
        Insert: {
          dashboard: string
          datasource: string
          team: string
        }
        Update: {
          dashboard?: string
          datasource?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboard_datasources_dashboard_fkey"
            columns: ["dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboard_datasources_datasource_fkey"
            columns: ["datasource"]
            isOneToOne: false
            referencedRelation: "datasources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dashboard_datasources_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboards: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          filters: Json
          id: string
          last_updated_at: string
          last_updated_by: string | null
          parent_dashboard: string | null
          settings: Json
          team: string
          thumbnail: string | null
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json
          id?: string
          last_updated_at?: string
          last_updated_by?: string | null
          parent_dashboard?: string | null
          settings?: Json
          team: string
          thumbnail?: string | null
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json
          id?: string
          last_updated_at?: string
          last_updated_by?: string | null
          parent_dashboard?: string | null
          settings?: Json
          team?: string
          thumbnail?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboards_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboards_parent_dashboard_fkey"
            columns: ["parent_dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dashboards_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      datasources: {
        Row: {
          columns: Json | null
          config: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          filters: Json
          id: string
          last_updated_at: string
          last_updated_by: string | null
          parameters: Json | null
          sample_data: Json | null
          size: number
          source: string
          team: string
          title: string
        }
        Insert: {
          columns?: Json | null
          config?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json
          id?: string
          last_updated_at?: string
          last_updated_by?: string | null
          parameters?: Json | null
          sample_data?: Json | null
          size?: number
          source: string
          team: string
          title: string
        }
        Update: {
          columns?: Json | null
          config?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          filters?: Json
          id?: string
          last_updated_at?: string
          last_updated_by?: string | null
          parameters?: Json | null
          sample_data?: Json | null
          size?: number
          source?: string
          team?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "datasources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "datasources_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_datasources_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      embed_users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          last_updated_at: string
          metadata: Json | null
          name: string
          team: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          last_updated_at?: string
          metadata?: Json | null
          name: string
          team: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          last_updated_at?: string
          metadata?: Json | null
          name?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_embed_users_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          config: Json
          created_at: string
          provider: string
          status: string
          team: string
        }
        Insert: {
          config?: Json
          created_at?: string
          provider: string
          status?: string
          team: string
        }
        Update: {
          config?: Json
          created_at?: string
          provider?: string
          status?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_integrations_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          created_at: string
          email: string
          name: string
          team: string
        }
        Insert: {
          created_at?: string
          email: string
          name: string
          team: string
        }
        Update: {
          created_at?: string
          email?: string
          name?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_invites_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      llm_settings: {
        Row: {
          analyst_agent_model: string
          analyst_agent_provider: string
          analyst_agent_type: Database["public"]["Enums"]["LLM hosting type"]
          anthropic_api_key: string | null
          google_api_key: string | null
          groq_api_key: string | null
          ollama_api_url: string | null
          openai_api_key: string | null
          programmer_agent_model: string
          programmer_agent_prompt: string | null
          programmer_agent_provider: string
          programmer_agent_type: Database["public"]["Enums"]["LLM hosting type"]
          team: string
          updated: boolean
        }
        Insert: {
          analyst_agent_model?: string
          analyst_agent_provider?: string
          analyst_agent_type?: Database["public"]["Enums"]["LLM hosting type"]
          anthropic_api_key?: string | null
          google_api_key?: string | null
          groq_api_key?: string | null
          ollama_api_url?: string | null
          openai_api_key?: string | null
          programmer_agent_model?: string
          programmer_agent_prompt?: string | null
          programmer_agent_provider?: string
          programmer_agent_type?: Database["public"]["Enums"]["LLM hosting type"]
          team: string
          updated?: boolean
        }
        Update: {
          analyst_agent_model?: string
          analyst_agent_provider?: string
          analyst_agent_type?: Database["public"]["Enums"]["LLM hosting type"]
          anthropic_api_key?: string | null
          google_api_key?: string | null
          groq_api_key?: string | null
          ollama_api_url?: string | null
          openai_api_key?: string | null
          programmer_agent_model?: string
          programmer_agent_prompt?: string | null
          programmer_agent_provider?: string
          programmer_agent_type?: Database["public"]["Enums"]["LLM hosting type"]
          team?: string
          updated?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_llm_settings_team_fkey"
            columns: ["team"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          account: string | null
          created_at: string
          dashboard: string | null
          embed_user: string | null
          id: string
          team: string | null
          type: string
          widget: string | null
        }
        Insert: {
          account?: string | null
          created_at?: string
          dashboard?: string | null
          embed_user?: string | null
          id?: string
          team?: string | null
          type: string
          widget?: string | null
        }
        Update: {
          account?: string | null
          created_at?: string
          dashboard?: string | null
          embed_user?: string | null
          id?: string
          team?: string | null
          type?: string
          widget?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_logs_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_logs_dashboard_fkey"
            columns: ["dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_logs_embed_user_team_fkey"
            columns: ["embed_user", "team"]
            isOneToOne: false
            referencedRelation: "embed_users"
            referencedColumns: ["id", "team"]
          },
          {
            foreignKeyName: "public_logs_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_logs_widget_fkey"
            columns: ["widget"]
            isOneToOne: false
            referencedRelation: "widgets"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          account: string
          team: string
        }
        Insert: {
          account: string
          team: string
        }
        Update: {
          account?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_user_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_members_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          dashboard: string
          id: string
          messages: Json
          query: string
          team: string | null
        }
        Insert: {
          created_at?: string
          dashboard: string
          id?: string
          messages?: Json
          query: string
          team?: string | null
        }
        Update: {
          created_at?: string
          dashboard?: string
          id?: string
          messages?: Json
          query?: string
          team?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_questions_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_dashboard_fkey"
            columns: ["dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          dashboard: string
          embed_user: string
          parameters: Json
          team: string
        }
        Insert: {
          created_at?: string
          dashboard: string
          embed_user: string
          parameters?: Json
          team: string
        }
        Update: {
          created_at?: string
          dashboard?: string
          embed_user?: string
          parameters?: Json
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_sessions_embed_user_team_fkey"
            columns: ["embed_user", "team"]
            isOneToOne: false
            referencedRelation: "embed_users"
            referencedColumns: ["id", "team"]
          },
          {
            foreignKeyName: "public_sessions_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_dashboard_fkey"
            columns: ["dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          accounts: number | null
          automations: boolean
          connected_datasources: number
          copilot: boolean
          custom_llm: boolean
          embed_users: number
          name: string
        }
        Insert: {
          accounts?: number | null
          automations?: boolean
          connected_datasources?: number
          copilot?: boolean
          custom_llm?: boolean
          embed_users?: number
          name: string
        }
        Update: {
          accounts?: number | null
          automations?: boolean
          connected_datasources?: number
          copilot?: boolean
          custom_llm?: boolean
          embed_users?: number
          name?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          interval: string
          period_end: string
          period_start: string
          product_name: string
          stripe_customer_id: string
          stripe_product_id: string
          stripe_subscription_id: string
          team: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          interval: string
          period_end: string
          period_start?: string
          product_name: string
          stripe_customer_id: string
          stripe_product_id: string
          stripe_subscription_id: string
          team: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          interval?: string
          period_end?: string
          period_start?: string
          product_name?: string
          stripe_customer_id?: string
          stripe_product_id?: string
          stripe_subscription_id?: string
          team?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_subscriptions_team_fkey"
            columns: ["team"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_product_name_fkey"
            columns: ["product_name"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["name"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          logo: string | null
          name: string | null
          phone_number: string | null
          stripe_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name?: string | null
          phone_number?: string | null
          stripe_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name?: string | null
          phone_number?: string | null
          stripe_id?: string | null
        }
        Relationships: []
      }
      widgets: {
        Row: {
          cache: Json | null
          code: string
          created_at: string
          dashboard: string
          id: string
          layouts: Json
          messages: Json
          settings: Json
          team: string
          title: string
          use_in_library: boolean | null
        }
        Insert: {
          cache?: Json | null
          code: string
          created_at?: string
          dashboard: string
          id?: string
          layouts?: Json
          messages?: Json
          settings?: Json
          team: string
          title: string
          use_in_library?: boolean | null
        }
        Update: {
          cache?: Json | null
          code?: string
          created_at?: string
          dashboard?: string
          id?: string
          layouts?: Json
          messages?: Json
          settings?: Json
          team?: string
          title?: string
          use_in_library?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_widgets_team_fkey"
            columns: ["team"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "widgets_dashboard_fkey"
            columns: ["dashboard"]
            isOneToOne: false
            referencedRelation: "dashboards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_id_in_dashboards: {
        Args: {
          id: string
          json_data: Json
        }
        Returns: boolean
      }
      string_to_uuid_array: {
        Args: {
          input_string: string
        }
        Returns: string[]
      }
      stripe_can_create_automation: {
        Args: {
          organisation: string
        }
        Returns: boolean
      }
      stripe_can_create_dashboard_datasource: {
        Args: {
          organisation: string
          dashboard_id: string
        }
        Returns: boolean
      }
      stripe_can_create_embed_user: {
        Args: {
          organisation: string
        }
        Returns: boolean
      }
      stripe_can_create_invite: {
        Args: {
          organisation: string
        }
        Returns: boolean
      }
      stripe_can_create_llm_settings: {
        Args: {
          organisation: string
        }
        Returns: boolean
      }
      stripe_can_read_dashboard: {
        Args: {
          organisation: string
        }
        Returns: boolean
      }
    }
    Enums: {
      "LLM hosting type": "onvo-hosted" | "self-hosted"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
    Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
    PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
    PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema["Tables"]
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
  ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

